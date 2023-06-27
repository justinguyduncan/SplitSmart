from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, Comment, Expense
from app.forms.comment_form import CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:expense_id>')
@login_required
def get_comments(expense_id):
    """
    Query for all comments of a specific expense and returns them in a list of comment dictionaries
    """
    expense = Expense.query.get(expense_id)
    # checks if expense exists
    if not expense:
        return {'errors': f"Expense {expense_id} does not exist"}, 400
    participants = ExpenseParticipant.query.filter(ExpenseParticipant.expense_id == expense.id).all()
    participant_ids = [participant.id for participant in participants]
    # checks if current user is a part of the expense
    if current_user.id != expense.creator_id and current_user.id not in participant_ids:
        return {'errors': f"User is not a participant of expense {expense.id}."}, 401
    comments = Comment.query.filter(Comment.expense_id == expense_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:expense_id>', methods=["POST"])
@login_required
def create_comment():
    form=CommentForm()
    print(form['csrf_token'].data, request.cookies['csrf_token'],111111)
    if form['csrf_token'].data == request.cookies['csrf_token']:
        
        data=request.json
        comment = Comment(**data)    
        db.session.add(comment)
        db.session.commit() 
        return comment.to_dict()
    
    
    #Update comment
    
@comment_routes.route('/<int:comment_id>',methods=["PUT"]) 
@login_required
def update_comment(id):
    """
    Updates a comment
    """
    comment = Comment.query.get(id)
    # checks if comment exists
    if not comment:
        return jsonify({
            "error":"comment not found"
        }),404
    data=request.json
    comment.comment=data['comment']
    db.session.commit()
    return comment.to_dict()
    
    
    
#Remove comment
@comment_routes.route('/<int:comment_id>',methods=["DELETE"]) 
# @login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({
            "error":"comment not found"
        }),404
    db.session.delete(comment)
    db.session.commit()
    return jsonify({
        "message":"Successfully deleted"
    })
    
    


# @comment_routes.route('/', methods=["POST"])
# # @login_required
# def create_comment():
#     # form['csrf_token'].data= request.cookies['csrf_token']
#     form= CommentForm()
#     if form.validate_on_submit():
      
#         new_comment=Comment(
#             comment=form.data['comment'],
#             user_id=form.data['user_id'],
#             expense_id=form.data['expense_id'])
        
#         db.session.add(new_comment)
#         db.session.commit()
      
#         return new_comment.to_dict()
#     return None