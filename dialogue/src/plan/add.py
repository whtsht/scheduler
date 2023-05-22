from src.sas import StrictDateTime, PlanInfo
from src.db_models import db, Plan

# 予定を追加するときは通知時間も記録する必要がある
# なので開始時間を一旦ここに退避させる
start_time_dict: dict[str, StrictDateTime] = {}


# 予定名，開始時刻，通知時間が揃ったらデータベースに情報を追加してTrueを返す
def from_message(line_id: str, plan_info: PlanInfo) -> bool:
    """入力文字列から予定を追加する"""
    return False


# 予定を追加する
def add_plan(plan: Plan):
    # データベースに追加
    db.session.add(plan)
    db.session.commit()

    # TODO
    # add_notificationを使って通知設定する


# どの情報が不足しているかを知らせる
def uncomplited_message(plan_info: PlanInfo) -> str:
    return ""


# 予定が変更できたことを知らせる
def complited_message(plan_info: PlanInfo) -> str:
    return ""
