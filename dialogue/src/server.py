from flask import Flask, request, abort, Blueprint
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import (
    MessageEvent,
    TextMessage,
    TextSendMessage,
)
from src.secret import (
    CHANNEL_ACCESS_TOKEN,
    CHANNEL_SECRET,
)
from src.main import main

from src.db_models import db


app = Flask(__name__)


def config_dev():
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
    db.init_app(app)
    db.create_all()


def config_prod():
    pass


@app.route("/", methods=["GET"])
def hello():
    return "hello :)"


line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(CHANNEL_SECRET)


@app.route("/callback", methods=["POST"])
def callback():
    # get X-Line-Signature header value
    signature = request.headers["X-Line-Signature"]

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print(
            "Invalid signature. Please check your channel access token/channel secret."
        )
        abort(400)

    return "OK"


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    response = main(event.message.text, event.source.user_id)
    line_bot_api.reply_message(event.reply_token, TextSendMessage(text=response))
