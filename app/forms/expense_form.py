from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SelectMultipleField
from wtforms.validators import DataRequired


class ExpenseForm(FlaskForm):
    description = StringField('Description', validators=[DataRequired()])
    amount = DecimalField('Amount', validators=[DataRequired()])
    friends = SelectMultipleField('Friends', validators=[DataRequired()], coerce=int)
