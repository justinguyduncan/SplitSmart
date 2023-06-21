from .db import db, environment, SCHEMA, add_prefix_for_prod


class Expense(db.Model):
    __tablename__ = 'expenses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Numeric, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    participants = db.relationship('ExpenseParticipant', back_populates='expense')
    creator = db.relationship('User', back_populates='expenses')
