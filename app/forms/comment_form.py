from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
# from wtforms.validators import DataRequired



class CommentForm(FlaskForm):
    comment = TextAreaField("Comment")
    user_id= IntegerField("User_id")
    expense_id= IntegerField("Expense_id")
    submit=SubmitField("Submit")