from flask import Flask
from enum import Enum
from src.db_models import db
from line_bot import line
from web import web
from src.plan.notif import sched
import logging


class Mode(Enum):
    Prod = (1,)
    Dev = (2,)


def create_app(mode: Mode):
    app = Flask(__name__)
    if mode == Mode.Dev:
        logging.basicConfig(level=logging.INFO)
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
    else:
        logging.basicConfig(level=logging.ERROR)
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

    with app.app_context():
        db.init_app(app)
        db.create_all()

    sched.start()

    app.register_blueprint(line)
    app.register_blueprint(web)

    return app


def create_prod_app():
    return create_app(Mode.Prod)


def create_dev_app():
    return create_app(Mode.Dev)
