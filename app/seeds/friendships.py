from app.models import db, Friendship, environment, SCHEMA
from sqlalchemy.sql import text

#userid 1 - demo
#userid 2 - aurora
#userid 3 - justin
#userid 4 - dmytro

def seed_friendships():
    #demo friends to aurora
    friendship1 = Friendship(
        user_id=1, friend_id=2)
    #aurora friends to demo
    friendship2 = Friendship(
        user_id=2, friend_id=1)
    #demo friend to justin
    friendship3 = Friendship(
        user_id=1, friend_id=3)
    #justin friend to demo
    friendship4 = Friendship(
        user_id=3, friend_id=1)
    #demo friend to dmytro
    friendship5 = Friendship(
        user_id=1, friend_id=4)
    #dmytro friend to demo
    friendship6 = Friendship(
        user_id=4, friend_id=1)

    db.session.add(friendship1)
    db.session.add(friendship2)
    db.session.add(friendship3)
    db.session.add(friendship4)
    db.session.add(friendship5)
    db.session.add(friendship6)
    db.session.commit()

def undo_friendships():
        if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friendships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friendships"))

    db.session.commit()
