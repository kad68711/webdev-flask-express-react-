# from crypt import methods
from code import interact
from sqlalchemy import Integer, String, Float, select
from sqlalchemy.orm import Mapped, mapped_column
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase



class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///book_collection.db"

db.init_app(app)


class Book(db.Model):
    id = mapped_column(Integer, primary_key=True)
    title = mapped_column(String, unique=True, nullable=False)
    author = mapped_column(String, nullable=False)
    rating = mapped_column(Float, nullable=False) 


with app.app_context():
    db.create_all()


@app.route('/')
def home():

    books = db.session.execute(select(Book).order_by(Book.id)).scalars()
    return render_template("index.html", books=books)


@app.route("/add", methods=("get", "post"))
def add():
    if request.method == "POST":

        book = Book(title=request.form["book_name"], author=request.form["book_author"],
                    rating=request.form["book_rating"])  # type: ignore
        db.session.add(book)
        db.session.commit()

        return redirect(url_for("home"))

    return render_template("add.html")


@app.route("/edit",methods=("get","post"))
def edit():
    id = request.args.get('id')
    book = db.session.execute(select(Book).where(Book.id == id)).scalar()
    if request.method == "POST":

        rating = request.form["new_rating"]
        print(rating)
        book.rating = rating #type:ignore
        db.session.commit()

        return redirect(url_for("home"))
    
    return render_template("edit.html", book=book)

@app.route("/delete")
def delete():
    book_id = request.args.get('id')

    # DELETE A RECORD BY ID
    book_to_delete = db.get_or_404(Book, book_id)
    # Alternative way to select the book to delete.
    # book_to_delete = db.session.execute(db.select(Book).where(Book.id == book_id)).scalar()
    db.session.delete(book_to_delete)
    db.session.commit()
    return redirect(url_for('home'))



if __name__ == "__main__":
    app.run(debug=True)
