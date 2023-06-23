from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comment1 = Comment(
        comment='thank you for dinner', user_id=1, expense_id=1)
    comment2 = Comment(
        comment='the snacks were yummy', user_id=3, expense_id=2)
    comment3 = Comment(
        comment='coffee and sandwiches', user_id=3, expense_id=3)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
