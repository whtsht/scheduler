from flask_apscheduler import APScheduler
from datetime import datetime
from linebot import LineBotApi
from linebot.models import (
    TextMessage,
)
from src.secret import CHANNEL_ACCESS_TOKEN

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)

sched = APScheduler()


def gen_id(user_id: str, title: str, date: datetime) -> str:
    return user_id + "_" + title + "_" + str(date)


def add_notification(user_id: str, title: str, date: datetime):
    sched.add_job(
        gen_id(user_id, title, date),
        send_notification,
        trigger="date",
        run_date=date,
        args=[user_id, title],
    )


def cancal_notification(user_id: str, title: str, date: datetime):
    sched.remove_job(
        gen_id(user_id, title, date),
    )


def send_notification(user_id: str, title: str):
    line_bot_api.push_message(user_id, TextMessage(text="「" + title + "」の時間です"))
    pass
