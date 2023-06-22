from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required
from app.models import db, Comment
from app.forms.comment_form import CommentForm


comment_routes = Blueprint('comments', __name__)







# Get comments by expense_id

@comment_routes.route('/<int:expense_id>')
@login_required
def get_comment(expense_id):
    comments = Comment.query.filter(Comment.expense_id==expense_id).all()
    comment_list = []
    for comment in comments:
        comment_dict = comment.to_dict()
        comment_list.append(comment_dict)
    return jsonify({'comments': comment_list})




# # Create new comment

@comment_routes.route('/',methods=["POST"])
# @login_required
def create_comment():
    # form['csrf_token'].data= request.cookies['csrf_token']
    data=request.json
    comment = Comment(**data)    
    db.session.add(comment)
    db.session.commit()
       
    return comment.to_dict()
    
    
    #Update comment
    
@comment_routes.route('/<int:comment_id>',methods=["PUT"]) 
# @login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
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