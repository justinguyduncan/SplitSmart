from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Comment, Expense
from app.forms.comment_form import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

# Get comments by expense_id
@comment_routes.route('/<int:expense_id>')
@login_required
def get_comment(expense_id):
    expense=Expense.query.get(expense_id)
    if not expense:
     return {'errors': f"Expense {expense_id} does not exist"}
    comments = Comment.query.filter(Comment.expense_id==expense_id).all()
    comment_list = []
    for comment in comments:
        comment_dict = comment.to_dict()
        comment_list.append(comment_dict)
    return jsonify({'comments': comment_list})

# # Create new comment

@comment_routes.route('/',methods=["POST"])
@login_required
def create_comment():
    form=CommentForm()
    form['csrf_token'].data= request.cookies['csrf_token']
     
    if form.validate_on_submit():
        new_comment=Comment(
        comment=form.data['comment'],
        user_id=current_user.id,
        expense_id=form.data['expense_id'])
        db.session.add(new_comment)
        db.session.commit() 
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    
    
    #Update comment
    
@comment_routes.route('/<int:comment_id>',methods=["PUT"]) 
@login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'errors': f"Comment {comment_id} does not exist"}, 404
    if comment.user_id != current_user.id:
        return {'errors': f"User is not the creator of comment {comment_id}"}, 401
    form=CommentForm()
    form['csrf_token'].data= request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment=form.data['comment']
        comment.user_id=current_user.id
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    
    
#Remove comment
@comment_routes.route('/<int:comment_id>',methods=["DELETE"]) 
@login_required
def delete_comment(comment_id):
  
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'errors': f"Comment {comment_id} does not exist"}, 404
    if comment.user_id != current_user.id:
        return {'errors': f"User is not the creator of comment {comment_id}"}, 401
    db.session.delete(comment)
    db.session.commit()
    return jsonify({
        "message":"Successfully deleted"
    })
    
    


# @comment_routes.route('/', methods=["POST"])
# @login_required
# def create_comment():
   
#         data=request.json
#         data['user_id']=current_user.id
#         new_comment = Comment(**data)   
#         db.session.add(new_comment)
#         db.session.commit()
      
#         return new_comment.to_dict()



  #Update comment
    
# @comment_routes.route('/<int:comment_id>',methods=["PUT"]) 
# @login_required
# def update_comment(comment_id):
#     comment = Comment.query.get(comment_id)
#     if not comment:
#         return {'errors': validation_errors_to_error_messages("comment not found")}, 404
     
#     data=request.json
#     comment.comment=data['comment']
#     db.session.commit()
#     return comment.to_dict()
   