from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comments(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenses.id')), nullable=False)
   

    expense = db.relationship('Expense', back_populates='comments')
    user = db.relationship('User', back_populates='comments')