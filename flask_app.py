from datetime import datetime
from flask import Flask, flash, render_template, url_for, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import login_user, LoginManager, UserMixin, logout_user, login_required, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError,EqualTo #Email
import os

class LoginForm(FlaskForm):
    # currently not used
    username = StringField('Username',validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me (but ah! forget my fate)')
    submit = SubmitField('Sign In')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    #email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField('Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField("Register")

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError("That username is already taken.")

#    def validate_email(self,email):
#        user = User.query.filter_by(email=email.data).first()
#        if user is not None:
#            raise ValidationError('Use a different email')

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'ekxifasjwf032jf3jifa3j09'

app = Flask(__name__)
app.config["DEBUG"] = True

SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="jjudge",
    password="uofcuofc",
    hostname="jjudge.mysql.pythonanywhere-services.com",
    databasename="jjudge$comments",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
migrate = Migrate(app,db)


class User(UserMixin, db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    password_hash = db.Column(db.String(128))
    score = db.Column(db.Integer)

    def __init__(self,username):
        self.username = username

    def check_password(self,password):
        return check_password_hash(self.password_hash, password)

    def set_password(self,password):
        self.password_hash = generate_password_hash(password)

    def get_id(self):
        return self.username

    def get_score(self):
        return self.score

    def set_score(self,newScore):
        self.score = max(newScore,self.score)

    def incrScore(self):
        self.score += 1

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4096))
    posted = db.Column(db.DateTime, default=datetime.now)

    commenter_id = db.Column(db.Integer,db.ForeignKey("users.id"),nullable=True)
    commenter = db.relationship("User",foreign_keys=commenter_id)

#Login system
#app.secret_key = "q35vh78h7m3two78mh7384hvmowmh4or78vwho"
app.config.from_object(Config)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(username=user_id).first()



@app.route('/',methods=["GET","POST"])
def index():
    if request.method == "GET":
        return render_template("main_page.html",comments=Comment.query.all())
    if not current_user.is_authenticated:
        return redirect(url_for('index'))
    comment = Comment(content=request.form["contents"], commenter=current_user)
        # extracts text area CONTENTS
    db.session.add(comment)
    db.session.commit()
    return redirect(url_for('index'))


@app.route("/login/",methods=["GET","POST"])
def login():
    if request.method == "GET":
        return render_template("login_page.html",error=False)
    user = load_user(request.form["username"])
    if user is None:
        return render_template("login_page.html", error=True)
    if not user.check_password(request.form["password"]):
        return render_template("login_page.html",error=True)
    login_user(user)
    return redirect(url_for('index'))

@app.route("/logout/")
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route("/register/", methods=['GET','POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash("You are now registered.")
        return redirect(url_for('login'))
    return render_template('register.html',title="Register",form=form)


@app.route('/score',methods=['GET','POST'])
def score():
    if current_user.is_authenticated:
        sc = request.form['score'] #args.get('score',0,type=int)
        current_user.incrScore()
        db.session.commit()
    return redirect(url_for('index'))


























