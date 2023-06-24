from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired



class CommentForm(FlaskForm):
    comment = TextAreaField("comment", validators=[DataRequired()])
    # user_id= IntegerField("user_id")
    # expense_id= IntegerField("expense_id")
    submit=SubmitField("submit")