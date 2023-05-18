from src.sas import StrictDateTime, PlanInfo
from src.db_models import db, Plan
from src.plan.main import UserState

# 予定を追加するときは通知時間も記録する必要がある
# なので開始時間を一旦ここに退避させる
start_time_dict: dict[str, StrictDateTime] = {}


# 予定名，開始時刻，通知時間が揃ったらデータベースに情報を追加してTrueを返す
def from_message(line_id: str, plan_info: PlanInfo) -> bool:
    """入力文字列から予定を追加する"""
    return False


def add_plan(plan: Plan):
    db.session.add(plan)
    db.session.commit()


def uncomplited_message(plan_info: PlanInfo) -> str:
    return ""


def complited_message(plan_info: PlanInfo) -> str:
    return ""
