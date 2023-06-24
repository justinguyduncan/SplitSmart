from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, Expense, ExpenseParticipant, Friendship
from app.forms import ExpenseForm
from app.api.auth_routes import validation_errors_to_error_messages

expense_routes = Blueprint('expenses', __name__)


# A user can get a list of all their created expenses.
# GET /api/expenses
@expense_routes.route('/')
@login_required
def my_expenses():
    # print(current_user.to_dict()) # {'id': 1, 'name': 'Demo L.', 'email': 'demo@aa.io'}
    expenses = Expense.query.filter(Expense.creator_id == current_user.to_dict()['id']).all()
    return {'expenses': [expense.to_dict() for expense in expenses]}


# A user can get a list of all their unsettled expenses
# GET /api/expenses/unsettled
@expense_routes.route('/unsettled')
@login_required
def unsettled_expenses():
    # grab all friendships where user id is friend_id
    friendships = Friendship.query.filter(Friendship.friend_id == current_user.to_dict()['id']).all()
    friendship_ids = (friendship.to_dict()['id'] for friendship in friendships)
    # return friendship_ids
    unsettled = ExpenseParticipant.query.filter(ExpenseParticipant.friendship_id.in_(friendship_ids), ExpenseParticipant.is_settled == False).all()
    return {'unsettled': [expense.to_dict() for expense in unsettled]}


# A user can get a list of all their settled expenses
# GET /api/expenses/settled
@expense_routes.route('/settled')
@login_required
def settled_expenses():
    # grab all friendships where user id is friend_id
    friendships = Friendship.query.filter(Friendship.friend_id == current_user.to_dict()['id']).all()
    friendship_ids = (friendship.to_dict()['id'] for friendship in friendships)
    # return friendship_ids
    settled = ExpenseParticipant.query.filter(ExpenseParticipant.friendship_id.in_(friendship_ids), ExpenseParticipant.is_settled == True).all()
    return {'settled': [expense.to_dict() for expense in settled]}


# A user can get an expense's details
# GET /api/expenses/:id
@expense_routes.route('/<int:id>')
@login_required
def expense(id):
    expense = Expense.query.get(id)
    return expense.to_dict()


# A user can create a new expense.
# POST /api/expenses
@expense_routes.route('/', methods=['POST'])
@login_required
def create_expense():
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.friends.choices = [(friendship.to_dict()['id'], friendship.to_dict()['friend']['name']) for friendship in Friendship.query.filter(Friendship.user_id == current_user.to_dict()['id']).all()]
    # [(6, 'Demo L.'), (7, 'Justin D.'), (8, 'Dmytro Y.'), (9, 'Will D.'), (10, 'Anthony R.')]
    if form.validate_on_submit():
        expense = Expense(
            description=form.data['description'],
            amount=form.data['amount'],
            creator_id=current_user.to_dict()['id']
        )
        # print(form.data['friends'])
        db.session.add(expense)
        db.session.commit()
        bill_delta = expense.to_dict()['amount']/(len(form.data['friends'])+1)
        for id in form.data['friends']: # each friendship id is user -> friend
            expense_participant = ExpenseParticipant(
                expense_id=expense.to_dict()['id'],
                friendship_id=id,
                amount_due=bill_delta
            )
            db.session.add(expense_participant)
            user_to_friend = Friendship.query.get(id)
            friend_to_user = Friendship.query.filter(Friendship.user_id == user_to_friend.to_dict()['friend_id'], Friendship.friend_id == user_to_friend.to_dict()['user_id']).first()
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
    expense = Expense.query.get(id)
    db.session.delete(expense)
    db.session.commit()
    return {'message': 'Delete successful'}
