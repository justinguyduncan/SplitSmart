from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Payment
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Friendship

payment_routes = Blueprint('payments', __name__)

def format_amount(amount):
    """
    Format the amount as a dollar amount.
    """
    return "${:.2f}".format(amount)

@payment_routes.route('/', methods=['POST'])
@login_required
def create_payment():
    """
    POST /api/payments
    Create a new payment.
    """
    data = request.json
    print(data)  # Print the received data for debugging

    amount = data.get('amount')
    friendship_id = data.get('friendship_id')  # Fetch the friendship_id from the request data

    if not amount:
        return jsonify({'errors': ['Amount is required']}), 400

    payment = Payment(amount=amount, friendship_id=friendship_id)  # Use the fetched friendship_id
    db.session.add(payment)
    db.session.commit()

    # Return a dictionary representation of the payment object with formatted amount
    return jsonify({
        'id': payment.id,
        'friendship_id': payment.friendship_id,
        'amount': format_amount(payment.amount),
        'created_at': payment.created_at.isoformat(),
        'updated_at': payment.updated_at.isoformat()
    }), 201

@payment_routes.route('/', methods=['GET'])
@login_required
def get_payments():
    """
    GET /api/payments
    Get a list of all payments for the current user.
    """
    current_user_friendships = Friendship.query.filter_by(user_id=current_user.id).all()
    friendship_ids = [friendship.id for friendship in current_user_friendships]
    payments = Payment.query.filter(Payment.friendship_id.in_(friendship_ids)).all()

    payments_list = []
    for payment in payments:
        payments_list.append({
            'id': payment.id,
            'friendship_id': payment.friendship_id,
            'amount': format_amount(payment.amount),  # Format amount as a dollar amount
            'created_at': payment.created_at.isoformat(),
            'updated_at': payment.updated_at.isoformat()
        })

    return jsonify(payments_list)

@payment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_payment(id):
    """
    DELETE /api/payments/:id
    Delete a specific payment for the current user.
    """
    payment = Payment.query.get(id)

    if not payment:
        return jsonify({"errors": "Payment does not exist"}), 404

    if payment.friendship.user_id != current_user.id:  # Update the condition
        return jsonify({"errors": "You do not have permission to delete this payment"}), 403

    db.session.delete(payment)
    db.session.commit()

    return jsonify({'success': True})
