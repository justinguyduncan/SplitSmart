from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, Comment, Expense
from app.forms import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages

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
        return {'errors': f"Expense {expense_id} does not exist"}
    comments = Comment.query.filter(Comment.expense_id == expense_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:expense_id>', methods=["POST"])
@login_required
def create_comment(expense_id):
    """
    Creates a new comment for the current expense
    """
    expense = Expense.query.get(expense_id)
    # checks if expense exists
    if not expense:
        return {'errors': f"Expense {expense_id} does not exist"}
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            comment=form.data['comment'],
            user_id=current_user.id,
            expense_id=expense_id
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_comment(id):
    """
    Updates a comment
    """
    comment = Comment.query.get(id)
    # checks if comment exists
    if not comment:
        return {'errors': f"Comment {id} does not exist."}
    # checks if current user is a creator of the comment
    if comment.user_id != current_user.id:
        return {'errors': f"User is not the creator of comment {id}."}
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    """
    Deletes a comment
    """
    comment = Comment.query.get(id)
    # checks if comment exists
    if not comment:
        return {'errors': f"Comment {id} does not exist."}
    # checks if current user is a creator of the comment
    if comment.user_id != current_user.id:
        return {'errors': f"User is not the creator of comment {id}."}
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Delete successful.'}
