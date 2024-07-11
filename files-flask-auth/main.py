from flask import Flask, render_template, request, url_for, redirect, flash, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)
login_manager = LoginManager()


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key-goes-here'

# CONNECT TO DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

app.config['UPLOAD_FOLDER']="static"

db.init_app(app)
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return db.get_or_404(User, user_id)




from sqlalchemy import Integer, String,select
from sqlalchemy.orm import Mapped, mapped_column

class User(UserMixin,db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)


 

with app.app_context():
    db.create_all()


@app.route('/')
def home():
    return render_template("index.html",logged_in=current_user.is_authenticated)


@app.route('/register',methods=["get","post"])
def register():
    if request.method=="POST":
        hashed_password=generate_password_hash(request.form["password"],method='pbkdf2:sha256',salt_length=8)
        try:
            new_user=User(email=request.form["email"],password=hashed_password,name=request.form["name"])
        
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
            return redirect(url_for('secrets'))
        except:
            flash("you are already registered login instead")
            return redirect(url_for('login'))
    
    return render_template("register.html")


@app.route('/login',methods=["get","post"])

def login():

    if request.method=="POST":
        email=request.form["email"]
        password=request.form["password"]

        user_object=db.session.execute(select(User).where(User.email==email)).scalar()

        if user_object:
            if check_password_hash(user_object.password,password):
                login_user(user_object)
                return redirect("secrets")
        
            else:
                flash("in correct password")
                return redirect(url_for("login"))
        else:
            flash("email not found")
            return redirect(url_for("login"))


        
        
           
      

    
    return render_template("login.html")


@app.route('/secrets')
@login_required
def secrets():
    return render_template("secrets.html",user_name=current_user.name,logged_in=current_user.is_authenticated)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for("home"))


@app.route('/download')
@login_required
def download():
        

    return send_from_directory(
        app.config['UPLOAD_FOLDER'], "files/cheat_sheet.pdf" , as_attachment=False
    )


if __name__ == "__main__":
    app.run(debug=True)
