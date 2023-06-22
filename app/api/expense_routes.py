from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Expense, ExpenseParticipant
from app.forms import ExpenseForm

expense_routes = Blueprint('expenses', __name__)


# A user can create a new expense.
# POST /api/expenses

# A user can get a list of all their expenses.
# GET /api/expenses
@expense_routes.route('/')
@login_required
def all_expenses():
    # print(current_user.to_dict()) # {'id': 1, 'name': 'Demo L.', 'email': 'demo@aa.io'}
    expenses = Expense.query.filter(Expense.creator_id == current_user.to_dict()['id']).all()
    return {'expenses': [expense.to_dict() for expense in expenses]}

# A user can get a expense details
# GET /api/expenses/:id
@expense_routes.route('/<int:id>')
@login_required
def expense(id):
    expense = Expense.query.filter(Expense.id == id).first()
    return expense.to_dict()

# A user can update an expense.
# PUT /api/expenses/:id

# A user can delete an expense.
# DELETE /api/expenses/:id
