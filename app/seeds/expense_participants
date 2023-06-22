from app.models import db, ExpenseParticipant, environment, SCHEMA
from sqlalchemy.sql import text

# friendship1 demo->aurora
# friendship2 demo->justin
# friendship3 demo->dmytro

# demo to expense $100 -> self, aurora
# demo to expense $60 -> self, justin, dmytro
# demo to expense $300 -> self, aurora, justin
# demo to expense $10 -> self, dmytro

def seed_expense_participants():
    expense1_1 = ExpenseParticipant(
        expense_id=1, friendship_id=1, amount_due=50)
    expense2_1 = ExpenseParticipant(
        expense_id=2, friendship_id=2, amount_due=20)
    expense2_2 = ExpenseParticipant(
        expense_id=2, friendship_id=3, amount_due=20)
    expense3_1 = ExpenseParticipant(
        expense_id=3, friendship_id=1, amount_due=100)
    expense3_2 = ExpenseParticipant(
        expense_id=3, friendship_id=2, amount_due=100)
    expense4_1 = ExpenseParticipant(
        expense_id=4, friendship_id=3, amount_due=5)

    db.session.add(expense1_1)
    db.session.add(expense2_1)
    db.session.add(expense2_2)
    db.session.add(expense3_1)
    db.session.add(expense3_2)
    db.session.add(expense4_1)
    db.session.commit()


def undo_expense_participants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expense_participants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expense_participants"))

    db.session.commit()
