from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


class FriendForm(FlaskForm):
    email = StringField("email", validators=[DataRequired(message='Email is required.'), Email(message='Not a valid email address.'), user_exists])
