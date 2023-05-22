from flask_apscheduler import APScheduler
from datetime import datetime
from linebot import LineBotApi
from src.db_models import Plan
from src.secret import CHANNEL_ACCESS_TOKEN

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)

sched = APScheduler()

# lineID => 予定を検索
latest_plan: dict[str, Plan] = {}


def gen_id(line_id: str, title: str, date: datetime) -> str:
    return line_id + "_" + title + "_" + str(date)


def add_notification(line_id: str, plan: Plan):
    sched.add_job(
        gen_id(line_id, plan.title, plan.notif_time),
        send_notification,
        trigger="date",
        run_date=plan.date,
        args=[line_id, plan],
    )


def cancal_notification(line_id: str, title: str, date: datetime):
    sched.remove_job(
        gen_id(line_id, title, date),
    )


# 利用者がスヌーズを押した場合，latest_planから最新の予定を取得し，5分後に通知する
def snooze(line_id: str):
    # TODO
    # 現在時刻から5分後の時刻を取得
    # add_notificationを使って通知設定する
    pass


def send_notification(line_id: str, plan: Plan):
    # TODO
    # Lineにメッセージを送信

    # 予定を記録
    latest_plan[line_id] = plan
