from flask import Blueprint, current_app

web = Blueprint("web", __name__)


@web.route("/", methods=["GET"])
def hello():
    current_app.logger.info("hello")
    return "hello :)"
