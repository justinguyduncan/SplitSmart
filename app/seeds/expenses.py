from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text

# friendship1 demo->aurora
# friendship2 demo->justin
# friendship3 demo->dmytro

# demo to expense $100 -> self, aurora
# demo to expense $60 -> self, justin, dmytro
# demo to expense $300 -> self, aurora, justin
# demo to expense $10 -> self, dmytro

def seed_expenses():
    expense1 = Expense(
        description='demo n aurora - dinner', amount=100, creator_id=1)
    expense2 = Expense(
        description='demo n justin n dmytro - snacks', amount=60, creator_id=1)
    expense3 = Expense(
        description='demo n aurora n justin - disneyland', amount=300, creator_id=1)
    expense4 = Expense(
        description='demo n dmytro - smoothies', amount=10, creator_id=1)

    db.session.add(expense1)
    db.session.add(expense2)
    db.session.add(expense3)
    db.session.add(expense4)
    db.session.commit()


def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenses"))

    db.session.commit()
