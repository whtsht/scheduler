from src.sas import PlanInfo
from src.db_models import db, Plan
from src.plan.main import UserState


def from_message(line_id: str, plan_info: PlanInfo) -> list[Plan]:
    """予定を検索する"""
    # PlanInfoを使って予定を検索する
    # 見つけられなかったら空の配列を返す
    return []


# 検索情報が不足することを知らせる
def uncomplited_message() -> str:
    return ""


# plan_listがからの場合はエラーを知らせる
def complited_message(plan_info: PlanInfo, plan_list: list[Plan]) -> str:
    return ""
