from flask import Flask, render_template, url_for,request
import requests
import smtplib
from dotenv import load_dotenv
import os

response = requests.get("https://api.npoint.io/88c2c1f644ef334058be")
blogs = response.json()

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html', blogs=blogs)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact',methods=["get","post"])
def contact():
    if request.method=='POST':
        load_dotenv()
        with smtplib.SMTP('smtp.gmail.com') as connection:
            connection.starttls()
            connection.login(user=os.getenv("user"),password=os.getenv("passw"))
            connection.sendmail(from_addr=os.getenv("user"),to_addrs=os.getenv("user"),msg=f'Subject:Feedback\n\n{request.form["username"]}::\n{request.form["email"]}::\n{request.form["number"]}::\n{request.form["message"]}')
 
    return render_template('contact.html')
        


@app.route('/post')
def ss():
    return 'aaagdfgdffdg'

@app.route("/post/<int:id>")
def post(id):
    for i in blogs:
        if i["id"] == id:
            blog = i

    return render_template('post.html', blog=blog)




app.run(debug=True)
