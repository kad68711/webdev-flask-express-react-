from sqlalchemy import Integer, String, Boolean, select
from sqlalchemy.orm import Mapped, mapped_column
from flask import Flask, jsonify, render_template, request
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from random import randint


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)

app = Flask(__name__)

# Connect to Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cafes.db'

db.init_app(app)


class Cafe(db.Model):
    # Cafe TABLE Configuration
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, unique=True, nullable=False)
    map_url = mapped_column(String, nullable=False)
    img_url = mapped_column(String, nullable=False)
    location = mapped_column(String, nullable=False)
    seats = mapped_column(String, nullable=False)
    has_toilet = mapped_column(Boolean, nullable=False)
    has_wifi = mapped_column(Boolean, nullable=False)
    has_sockets = mapped_column(Boolean, nullable=False)
    can_take_calls = mapped_column(Boolean, nullable=False)
    coffee_price = mapped_column(String, nullable=True)

    def to_dict(self):

        dictionary = {}

        for column in self.__table__.columns:

            dictionary[column.name] = getattr(self, column.name)

        return dictionary


with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return render_template("index.html")


# HTTP GET - Read Record
@app.route('/random')
def random():
    element_count = db.session.query(Cafe).count()

    random_cafe = db.session.execute(select(Cafe).where(
        Cafe.id == randint(0, element_count))).scalar()

    return jsonify(cafe=random_cafe.to_dict())


@app.route('/all')
def all():

    cafes = db.session.execute(select(Cafe)).scalars()

    list = []

    for cafe in cafes.all():
        list.append(cafe.to_dict())

    return jsonify(cafes=list)


@app.route('/search')
def search():

    user_location = request.args['loc'].title()

    cafes = db.session.execute(select(Cafe).where(
        Cafe.location == user_location)).scalars()

    list = []

    for cafe in cafes.all():
        list.append(cafe.to_dict())

    if list:

        return jsonify(cafes=list)
    else:
        return jsonify(cafes="no cafes in this locaiton")


@app.route('/add',methods=["post"])
def add():
    database=Cafe(
    name=request.form["name"],
    map_url=request.form["map_url"],
    img_url=request.form["img_url"],
    location=request.form["location"],
    seats=request.form["seats"],
    has_toilet=bool(request.form["has_toilet"]),
    has_wifi=bool(request.form["has_wifi"]),
    has_sockets=bool(request.form["has_sockets"]),
    can_take_calls=bool(request.form["can_take_calls"]),
    coffee_price=request.form["coffee_price"])

    db.session.add(database)
    db.session.commit()

    return jsonify(reponse="success")

@app.route('/update_price/<id>',methods=["patch"])
def update_price(id):
    try:
        cafe=db.session.execute(select(Cafe).where(Cafe.id==id)).scalar()
        cafe.coffee_price=request.args["price"]
        db.session.commit()

        return jsonify(response="price was successfully updated")


    except:
        return jsonify(response="sono id areba cafe wa nai"),400
    
@app.route("/report_closed/<id>",methods=["delete"])
def delete(id):

    if request.args["api_key"]=="TopSecret":
        try:
            cafe=db.session.execute(select(Cafe).where(Cafe.id==id)).scalar()
            db.session.delete(cafe)
            db.session.commit()
            return jsonify(response="succesfully deleted")
        except:
            return jsonify(response="cafe doesnt exist"),404
    else:
        return jsonify(response="access not granted"),403
    


# HTTP POST - Create Record
# HTTP PUT/PATCH - Update Record
# HTTP DELETE - Delete Record
if __name__ == '__main__':
    app.run(debug=True)
