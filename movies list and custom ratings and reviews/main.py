from sqlalchemy import Integer, String, select, Float
from sqlalchemy.orm import Mapped, mapped_column
from flask import Flask, render_template, redirect, url_for, request
from flask_bootstrap import Bootstrap5
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField
from wtforms.validators import DataRequired
import requests
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv
import os

load_dotenv()


class Edit_Form(FlaskForm):
    rating = FloatField("Rating out of 10", validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired()])
    submit = SubmitField('Done')


class Add(FlaskForm):
    movie_title = StringField("Movie Title", validators=[DataRequired()])
    submit = SubmitField('Add Movie')


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("secret_key")
Bootstrap5(app)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)


class Movies(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    year: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    rating: Mapped[float] = mapped_column(Float, nullable=False)
    ranking: Mapped[str] = mapped_column(Integer, nullable=True)
    review: Mapped[str] = mapped_column(String, nullable=True)
    img_url: Mapped[str] = mapped_column(String, nullable=False)


with app.app_context():

    db.create_all()


@app.route("/")
def home():
    movies = list(db.session.execute(
        select(Movies).order_by(Movies.rating)).scalars())
    i = len(movies)+1
    for movie in movies:
        
        movie.ranking = i-1
        
        i -=1
    db.session.commit()

    print(movies)

    return render_template("index.html", movies=movies)


@app.route("/edit", methods=("get", "post"))
def edit():

    id = request.args["id"]
    movie = db.session.execute(select(Movies).where(Movies.id == id)).scalar()
    edit_form = Edit_Form()

    if edit_form.validate_on_submit():

        movie.rating = request.form["rating"]
        movie.review = request.form["review"]
        db.session.commit()

        return redirect(url_for("home"))

    return render_template("edit.html", movie=movie, form=edit_form)


@app.route("/delete")
def delete():

    id = request.args["id"]
    movie = db.get_or_404(Movies, id)

    db.session.delete(movie)
    db.session.commit()

    return redirect(url_for("home"))


@app.route("/add", methods=("get", "post"))
def add():
    form = Add()
    if form.validate_on_submit():
        movie_title = request.form["movie_title"]

        url = f"https://api.themoviedb.org/3/search/movie?api_key={os.getenv("api_key")}&query={movie_title}&include_adult=false&language=en-US"

        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {os.getenv("token")}"
        }

        try:

            response = requests.get(url, headers=headers)
            print(response)

            return render_template("select.html", movies=response.json()["results"])

        except:
            return render_template("select.html", movies=[])

    return render_template("add.html", form=form)


@app.route("/find")
def find_movie():
    try:

        id = request.args["id"]

        url = f"https://api.themoviedb.org/3/movie/{id}?api_key={os.getenv("api_key")}&language=en-US"

        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {os.getenv("token")}"
        }

        response = requests.get(url, headers=headers)

        movie = response.json()

        print(movie)
        img = f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"

        content = Movies(title=movie["original_title"], year=movie['release_date'].split("-")[0],
                         description=movie["overview"], rating=movie["vote_average"], img_url=img)

        db.session.add(content)
        db.session.commit()

        return redirect(url_for("edit", id=content.id))
    except Exception as e:

        return f"An error occurred: {str(e)}", 500


if __name__ == '__main__':
    app.run(debug=True)
