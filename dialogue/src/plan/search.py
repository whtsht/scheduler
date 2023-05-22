from src.info import PlanInfo
from src.db_models import db, Plan
from src.plan.main import UserState


# PlanInfoを使って予定を検索する
# 見つけられなかったら空の配列を返す
def from_message(line_id: str, plan_info: PlanInfo) -> list[Plan]:
    return []


# 検索情報が不足することを知らせる
def uncomplited_message(plan_info: PlanInfo) -> str:
    return ""


# どのような予定があるか知らせる
# plan_listがからの場合は検索が失敗したことを知らせる
def complited_message(plan_info: PlanInfo, plan_list: list[Plan]) -> str:
    return ""
