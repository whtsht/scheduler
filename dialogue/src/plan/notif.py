from flask_apscheduler import APScheduler
from datetime import datetime
from linebot import LineBotApi
from linebot.models import (
    TextMessage,
)
from src.secret import CHANNEL_ACCESS_TOKEN

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)

sched = APScheduler()

# lineID => 予定名を検索
latest_plan: dict[str, str] = {}


def gen_id(line_id: str, title: str, date: datetime) -> str:
    return line_id + "_" + title + "_" + str(date)


def add_notification(line_id: str, title: str, date: datetime):
    sched.add_job(
        gen_id(line_id, title, date),
        send_notification,
        trigger="date",
        run_date=date,
        args=[line_id, title],
    )


def cancal_notification(line_id: str, title: str, date: datetime):
    sched.remove_job(
        gen_id(line_id, title, date),
    )


def snooze(line_id: str):
    # 現在時刻から5分後の時刻を取得
    # add_notificationを使って通知設定する
    pass


def send_notification(line_id: str, title: str):
    # Lineにメッセージを送信
    line_bot_api.push_message(line_id, TextMessage(text="「" + title + "」の時間です"))
    # 予定名を記録
    latest_plan[line_id] = title
