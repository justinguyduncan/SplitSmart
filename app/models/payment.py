from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    friendship_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('friendships.id')), nullable=False)
    amount = db.Column(db.Numeric, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    friendship = db.relationship('Friendship', back_populates='payments')
