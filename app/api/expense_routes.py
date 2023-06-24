from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, Expense, ExpenseParticipant, Friendship
from app.forms import ExpenseForm
from app.api.auth_routes import validation_errors_to_error_messages

expense_routes = Blueprint('expenses', __name__)


@expense_routes.route('/')
@login_required
def my_expenses():
    """
    Query for all expenses created by the current user and returns them in a list of expense dictionaries
    """
    expenses = Expense.query.filter(Expense.creator_id == current_user.id).all()
    return {'expenses': [expense.to_dict() for expense in expenses]}


@expense_routes.route('/unsettled')
@login_required
def unsettled_expenses():
    """
    Query for all unsettled expenses charged to the current user and returns them in a list of expense dictionaries
    """
    friendships = Friendship.query.filter(Friendship.friend_id == current_user.id).all()
    friendship_ids = [friendship.id for friendship in friendships]
    unsettled = ExpenseParticipant.query.filter(ExpenseParticipant.friendship_id.in_(friendship_ids), ExpenseParticipant.is_settled == False).all()
    return {'unsettled': [expense.to_dict() for expense in unsettled]}


@expense_routes.route('/settled')
@login_required
def settled_expenses():
    """
    Query for all settled expenses charged to the current user and returns them in a list of expense dictionaries
    """
    friendships = Friendship.query.filter(Friendship.friend_id == current_user.id).all()
    friendship_ids = [friendship.id for friendship in friendships]
    settled = ExpenseParticipant.query.filter(ExpenseParticipant.friendship_id.in_(friendship_ids), ExpenseParticipant.is_settled == True).all()
    return {'settled': [expense.to_dict() for expense in settled]}


# A user can get an expense's details
# GET /api/expenses/:id
@expense_routes.route('/<int:id>')
@login_required
def expense(id):
    """
    Query for an expense by id and returns that expense in a dictionary
    """
    expense = Expense.query.get(id)
    return expense.to_dict()


# A user can create a new expense.
# POST /api/expenses
@expense_routes.route('/', methods=['POST'])
@login_required
def create_expense():
    """
    Creates a new expense, creates corresponding expense participant information, and updates friendships' bill amounts
    """
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.friends.choices = [(friendship.id, friendship.friend.to_dict()['name']) for friendship in Friendship.query.filter(Friendship.user_id == current_user.id).all()]
    # [(6, 'Demo L.'), (7, 'Justin D.'), (8, 'Dmytro Y.'), (9, 'Will D.'), (10, 'Anthony R.')]
    if form.validate_on_submit():
        expense = Expense(
            description=form.data['description'],
            amount=form.data['amount'],
            creator_id=current_user.id
        )
        # print(form.data['friends'])
        db.session.add(expense)
        db.session.commit()
        bill_delta = expense.amount/(len(form.data['friends'])+1)
        for id in form.data['friends']: # each friendship id is user -> friend
            expense_participant = ExpenseParticipant(
                expense_id=expense.id,
                friendship_id=id,
                amount_due=bill_delta
            )
            db.session.add(expense_participant)
            user_to_friend = Friendship.query.get(id)
            friend_to_user = Friendship.query.filter(Friendship.user_id == user_to_friend.friend_id, Friendship.friend_id == user_to_friend.user_id).first()
            user_to_friend.bill -= bill_delta
            friend_to_user.bill += bill_delta
        db.session.commit()
        return expense.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# A user can update an expense.
# PUT /api/expenses/:id


# A user can delete an expense.
# DELETE /api/expenses/:id
@expense_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_expense(id):
    """
    Deletes an expense, corresponding expense participant information, and corresponding comments
    """
    expense = Expense.query.get(id)
    db.session.delete(expense)
    db.session.commit()
    return {'message': 'Delete successful'}
