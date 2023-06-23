from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SelectMultipleField
from wtforms.validators import DataRequired


class ExpenseForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    amount = DecimalField('amount', validators=[DataRequired()])
    friends = SelectMultipleField('friends', validators=[DataRequired()], coerce=int)
