from src.info import StrictDateTime, PlanInfo
from src.db_models import db, Plan


# 予定名，開始時刻が揃ったらデータベースに情報を追加してTrueを返す
def from_message(line_id: str, plan_info: PlanInfo) -> bool:
    """入力文字列から予定を追加する"""
    # TODO
    # add_notificationを使って通知設定する
    # 通知は開始時刻の30分前に設定する
    # title = plan_info.title
    # start_time = plan.start_time or plan.allday
    # titleとstart_timeがかぶってたら失敗
    return False


# 予定を追加する
def add_plan(plan: Plan):
    # データベースに追加
    db.session.add(plan)
    db.session.commit()


# どの情報が不足しているかを知らせる
def uncomplited_message(plan_info: PlanInfo) -> str:
    return ""


# 予定が変更できたことを知らせる
def complited_message(plan_info: PlanInfo) -> str:
    return ""
