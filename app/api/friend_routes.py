from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Friendship, User
from sqlalchemy import exc

friend_routes = Blueprint('friends', __name__)

def calculate_bill_total(friendship):
    """
    Calculate the bill total for a friendship.
    """
    expenses = friendship.expenses
    bill_total = sum(float(expense.amount_due) for expense in expenses)
    return bill_total



@friend_routes.route('/<int:friend_id>', methods=['POST'])
@login_required
def create_friendship(friend_id):
    """
    Create a new friendship.
    """
    if current_user.id == friend_id:
        return jsonify({'message': 'Cannot add yourself as a friend.'}), 400

    existing_friendship = Friendship.query.filter(
        ((Friendship.user_id == current_user.id) & (Friendship.friend_id == friend_id)) |
        ((Friendship.user_id == friend_id) & (Friendship.friend_id == current_user.id))
    ).first()

    if existing_friendship:
        return jsonify({'message': 'Friendship already exists.'}), 400

    friend = User.query.get(friend_id)
    if not friend:
        return jsonify({'message': 'Friend not found.'}), 404

    new_friendship = Friendship(user_id=current_user.id, friend_id=friend_id)
    db.session.add(new_friendship)
    db.session.commit()

    bill_total = calculate_bill_total(new_friendship)

    return jsonify({
        'id': new_friendship.id,
        'user_id': new_friendship.user_id,
        'friend_id': new_friendship.friend_id,
        'is_active': new_friendship.is_active,
        'bill': "${:.2f}".format(calculate_bill_total(friendship)),
        'created_at': new_friendship.created_at.isoformat(),
        'updated_at': new_friendship.updated_at.isoformat()
    }), 201

@friend_routes.route('/<int:friend_id>', methods=['GET'])
def get_friendship(friend_id):
    """
    Get details of a friendship.
    """
    friendship = Friendship.query.filter(
        (Friendship.user_id == current_user.id) & (Friendship.friend_id == friend_id)
    ).first()

    if not friendship:
        return jsonify({'message': 'Friendship not found.'}), 404

    bill_total = calculate_bill_total(friendship)

    return jsonify({
        'id': friendship.id,
        'user_id': friendship.user_id,
        'friend_id': friendship.friend_id,
        'bill': "${:.2f}".format(calculate_bill_total(friendship)),
        'created_at': friendship.created_at.isoformat(),
        'updated_at': friendship.updated_at.isoformat()
    })

@friend_routes.route('/', methods=['GET'])
def list_friendships():
    """
    Get a list of all user's friendships.
    """
    # Assuming current user's id is stored in session
    user_id = current_user.id
    friendships = Friendship.query.filter(Friendship.user_id == user_id).all()

    friendships_list = []
    bill_total = 0  # Initialize the bill_total variable

    for friendship in friendships:
        bill_total += calculate_bill_total(friendship)  # Calculate the bill total for each friendship

        friendships_list.append({
            'id': friendship.id,
            'user_id': friendship.user_id,
            'friend_id': friendship.friend_id,
            'bill': "${:.2f}".format(calculate_bill_total(friendship)),
            'is_active': friendship.is_active,
            'created_at': friendship.created_at.isoformat(),
            'updated_at': friendship.updated_at.isoformat()
        })

    return jsonify(friendships_list)



@friend_routes.route('/<int:friend_id>', methods=['PUT'])
@login_required
def update_friendship(friend_id):
    """
    Update a friendship's is_active or bill.
    """
    # Retrieve the current user's ID
    user_id = current_user.id

    # Check if the friendship exists and is associated with the current user
    friendship = Friendship.query.filter(
        Friendship.user_id == user_id,
        Friendship.friend_id == friend_id
    ).first()

    if not friendship:
        return jsonify({'message': 'Friendship not found.'}), 404

    # Update the fields
    is_active = request.json.get('is_active', None)
    bill = request.json.get('bill', None)

    if is_active is not None:
        friendship.is_active = is_active
    if bill is not None:
        friendship.bill = bill

    # Commit the changes
    db.session.commit()

    bill_total = calculate_bill_total(friendship)

    return jsonify({
        'id': friendship.id,
        'user_id': friendship.user_id,
        'friend_id': friendship.friend_id,
        'is_active': friendship.is_active,
        'bill': "${:.2f}".format(calculate_bill_total(friendship)),
        'created_at': friendship.created_at.isoformat(),
        'updated_at': friendship.updated_at.isoformat()
    })
