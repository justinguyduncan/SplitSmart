from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Expense, ExpenseParticipant
from app.forms import ExpenseForm

expense_routes = Blueprint('expenses', __name__)


# A user can create a new expense.
# POST /api/expenses

# A user can get a list of all their expenses.
# GET /api/expenses

# A user can get a expense details
# GET /api/expenses/:id

# A user can update an expense.
# PUT /api/expenses/:id

# A user can delete an expense.
# DELETE /api/expenses/:id
