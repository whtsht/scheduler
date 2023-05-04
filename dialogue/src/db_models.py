from flask_sqlalchemy import SQLAlchemy
from src.sas import StrictDateTime
from typing import Optional

db = SQLAlchemy()


class Plan(db.Model):
    __tablename__ = "plans"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False, unique=True)
    title = db.Column(db.String(100), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    notification = db.Column(db.DateTime, nullable=True)

    def __init__(
        self,
        title: str,
        user_id: str,
        time: StrictDateTime,
        notification: Optional[StrictDateTime] = None,
    ):
        self.title = title
        self.user_id = user_id
        self.time = time.into()
        self.notification = None if notification == None else notification.into()
