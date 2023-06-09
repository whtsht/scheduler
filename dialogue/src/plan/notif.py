from flask_apscheduler import APScheduler
from datetime import datetime
from linebot import LineBotApi
from src.db_models import Plan
from src.secret import CHANNEL_ACCESS_TOKEN

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)

sched = APScheduler()

# lineID => 予定を検索
latest_plan: dict[str, Plan] = {}


# ジョブに対して唯一のIDを生成する
def gen_id(line_id: str, title: str, date: datetime) -> str:
    return line_id + "_" + title + "_" + str(date)


# 予定通知処理をジョブリストに追加
def add_notification(line_id: str, plan: Plan):
    # start_timeかalldayのどちらか必ず値が入っている
    start_time = plan.start_time or plan.allday
    sched.add_job(
        gen_id(line_id, plan.title, start_time),  # type: ignore
        send_notification,
        trigger="date",
        run_date=plan.notif_time,
        args=[line_id, plan],
    )


# ジョブリストから通知処理通知を削除
def cancel_notification(line_id: str, title: str, date: datetime):
    sched.remove_job(
        gen_id(line_id, title, date),
    )


# 利用者がスヌーズを押した場合，latest_planから最新の予定を取得し，5/10/30/分後に通知する
# その予定の開始時刻から30分以上経過している場合は，予定が古すぎることを知らせる
def snooze(line_id: str, after: int):
    # TODO
    # 現在時刻からafter分後の時刻を取得
    # add_notificationを使って通知設定する
    plan = latest_plan[line_id]
    pass


# 利用者に予定の通知を行う
def send_notification(line_id: str, plan: Plan):
    # TODO
    # Lineにメッセージを送信
    # 5/10/30分後に通知できるようにボタンを追加する

    # 予定を記録
    latest_plan[line_id] = plan
