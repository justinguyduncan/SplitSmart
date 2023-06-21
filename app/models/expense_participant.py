from .db import db, environment, SCHEMA, add_prefix_for_prod


class ExpenseParticipant(db.Model):
    __tablename__ = 'expense_participants'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenses.id')), nullable=False)
    friendship_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('friendships.id')), nullable=False)
    amount_due = db.Column(db.Numeric, nullable=False)
    is_settled = db.Column(db.Boolean, default=False, nullable=False)

    expense = db.relationship('Expense', back_populates='participants')
    friendship = db.relationship('Friendship', back_populates='expenses')
