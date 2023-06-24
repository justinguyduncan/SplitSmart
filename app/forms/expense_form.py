from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SelectMultipleField
from wtforms.validators import DataRequired, NumberRange


class ExpenseForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(message='An expense description is required.')])
    amount = DecimalField('amount', validators=[NumberRange(min=1, message='The expense amount must be at least $1.')])
    friends = SelectMultipleField('friends', coerce=int)
