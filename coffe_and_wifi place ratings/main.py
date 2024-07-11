from flask import Flask, render_template,request,redirect,url_for
from flask_bootstrap import Bootstrap5
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField,URLField,SelectField
from wtforms.validators import DataRequired
import csv

'''
Red underlines? Install the required packages first: 
Open the Terminal in PyCharm (bottom left). 

On Windows type:
python -m pip install -r requirements.txt

On MacOS type:
pip3 install -r requirements.txt

This will install the packages from requirements.txt for this project.
'''

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKR6b'
Bootstrap5(app)


class CafeForm(FlaskForm):
    cafe = StringField('Cafe name', validators=[DataRequired()])
    location=URLField('url',validators=[DataRequired()])
    open = StringField('Cafe opening time', validators=[DataRequired()])
    close = StringField('Cafe closing time', validators=[DataRequired()])
    coffee_rating= SelectField('coffee rating', choices=["☕️","☕️☕️","☕️☕️☕️","☕️☕️☕️☕️"])
    wifi_rating= SelectField('wifi rating', choices=["✘","💪","💪💪","💪💪💪"])
    power_outlets= SelectField('power_outlets', choices=["✘","🔌","🔌🔌","🔌🔌🔌"])
    submit = SubmitField('Submit',render_kw={"style":"margin: 10px"})

# Exercise:
# add: Location URL, open time, closing time, coffee rating, wifi rating, power outlet rating fields
# make coffee/wifi/power a select element with choice of 0 to 5.
#e.g. You could use emojis ☕️/💪/✘/🔌
# make all fields required except submit
# use a validator to check that the URL field has a URL entered.
# ---------------------------------------------------------------------------


# all Flask routes below
@app.route("/")
def home():
    return render_template("index.html")


@app.route('/add',methods=("get","post"))
def add_cafe():
    form = CafeForm()
    if form.validate_on_submit():
        print("True")
        with open('cafe-data.csv',mode="a", newline='', encoding='utf-8') as csv_file:
            writer=csv.writer(csv_file)
            writer.writerow([request.form['cafe'],request.form['location'],request.form['open'],request.form['close'],request.form['coffee_rating'],request.form['wifi_rating'],request.form['power_outlets']])
            return redirect(url_for('cafes'))
            
    # Exercise:
    # Make the form write a new row into cafe-data.csv
    # with   if form.validate_on_submit()
    return render_template('add.html', form=form)


@app.route('/cafes')
def cafes():
    with open('cafe-data.csv', newline='', encoding='utf-8') as csv_file:
        csv_data = csv.reader(csv_file, delimiter=',')
        list_of_rows = []
        for row in csv_data:
            list_of_rows.append(row)
            
    return render_template('cafes.html', cafes=list_of_rows)


if __name__ == '__main__':
    app.run(debug=True)
    
