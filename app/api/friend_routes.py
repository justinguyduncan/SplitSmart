from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, User, Friendship
from app.forms import FriendForm
from app.api.auth_routes import validation_errors_to_error_messages

friend_routes = Blueprint('friends', __name__)


# def calculate_bill_total(friendship):
#     """
#     Calculate the bill total for a friendship.
#     """
#     expenses = friendship.expenses
#     bill_total = sum(float(expense.amount_due) for expense in expenses)
#     return bill_total


@friend_routes.route('/', methods=['POST'])
@login_required
def create_friendship():
    """
    Creates a new friendship
    """
    form = FriendForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        friend = User.query.filter(User.email == form.data['email']).first()
        existing_friendship = Friendship.query.filter(Friendship.user_id == current_user.id, Friendship.friend_id == friend.id).first()
        if existing_friendship and existing_friendship.is_active == True:
            return {'message': 'Friendship is already active.'}
        if existing_friendship and existing_friendship.is_active == False:
            update_friendship(existing_friendship.id)
            return {'message': 'Friendship has been made active again.'}
        user_to_friend = Friendship(
            user_id=current_user.id,
            friend_id=friend.id
        )
        friend_to_user = Friendship(
            user_id=friend.id,
            friend_id=current_user.id
        )
        db.session.add_all([user_to_friend, friend_to_user])
        db.session.commit()
        return user_to_friend.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# @friend_routes.route('/<int:friend_id>', methods=['POST'])
# @login_required
# def create_friendship(friend_id):
#     """
#     Creates a new friendship
#     """
#     if current_user.id == friend_id:
#         return jsonify({'message': 'Cannot add yourself as a friend.'}), 400

#     existing_friendship = Friendship.query.filter(
#         ((Friendship.user_id == current_user.id) & (Friendship.friend_id == friend_id)) |
#         ((Friendship.user_id == friend_id) & (Friendship.friend_id == current_user.id))
#     ).first()

#     if existing_friendship:
#         return jsonify({'message': 'Friendship already exists.'}), 400

#     friend = User.query.get(friend_id)
#     if not friend:
#         return jsonify({'message': 'Friend not found.'}), 404

#     new_friendship = Friendship(user_id=current_user.id, friend_id=friend_id)
#     db.session.add(new_friendship)
#     db.session.commit()

#     bill_total = calculate_bill_total(new_friendship)

#     return jsonify({
#         'id': new_friendship.id,
#         'user_id': new_friendship.user_id,
#         'friend_id': new_friendship.friend_id,
#         'is_active': new_friendship.is_active,
#         'bill': "${:.2f}".format(calculate_bill_total(friendship)),
#         'created_at': new_friendship.created_at.isoformat(),
#         'updated_at': new_friendship.updated_at.isoformat()
#     }), 201


@friend_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_friendship(id):
    """
    Query for a friendship by id and returns that friendship in a dictionary
    """
    friendship = Friendship.query.get(id)
    if not friendship:
        return {'errors': f"Friendship {id} does not exist."}, 400
    if current_user.id not in [friendship.user_id, friendship.friend_id]:
        return {'errors': f"User is not a part of friendship {id}."}, 401
    return friendship.to_dict()


@friend_routes.route('/', methods=['GET'])
@login_required
def get_friendships():
    """
    Query for all active friendships of the current user and returns them in a list of friendship dictionaries
    """
    friendships = Friendship.query.filter(Friendship.user_id == current_user.id, Friendship.is_active == True).all()
    return {'friendships': [friendship.to_dict() for friendship in friendships]}


@friend_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_friendship(id):
    """
    Updates a friendship's active status
    """
    user_to_friend = Friendship.query.get(id)
    if not user_to_friend:
        return {'errors': f"Friendship {id} does not exist."}, 400
    if user_to_friend.user_id != current_user.id:
        return {'errors': f"User is not the creator of friendship {id}."}, 401
    friend_to_user = Friendship.query.filter(Friendship.user_id == user_to_friend.friend_id, Friendship.friend_id == user_to_friend.user_id).first()
    user_to_friend.is_active = not user_to_friend.is_active
    friend_to_user.is_active = not friend_to_user.is_active
    db.session.commit()
    return user_to_friend.to_dict()


# @friend_routes.route('/<int:friend_id>', methods=['PUT'])
# @login_required
# def update_friendship(friend_id):
#     """
#     Update a friendship
#     """
#     # Retrieve the current user's ID
#     user_id = current_user.id

#     # Check if the friendship exists and is associated with the current user
#     friendship = Friendship.query.filter(Friendship.user_id == user_id, Friendship.friend_id == friend_id).first()

#     if not friendship:
#         return jsonify({'message': 'Friendship not found.'}), 404

#     # Update the fields
#     is_active = request.json.get('is_active', None)
#     bill = request.json.get('bill', None)

#     if is_active is not None:
#         friendship.is_active = is_active
#     if bill is not None:
#         friendship.bill = bill

#     # Commit the changes
#     db.session.commit()

#     bill_total = calculate_bill_total(friendship)

#     return jsonify({
#         'id': friendship.id,
#         'user_id': friendship.user_id,
#         'friend_id': friendship.friend_id,
#         'is_active': friendship.is_active,
#         'bill': "${:.2f}".format(calculate_bill_total(friendship)),
#         'created_at': friendship.created_at.isoformat(),
#         'updated_at': friendship.updated_at.isoformat()
#     })
