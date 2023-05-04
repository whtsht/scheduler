from src.sas import StrictDateTime, PrePlan
from src.plan.date import check_date_time
from src.db_models import db, Plan


def from_message(user_id: str, input: PrePlan) -> str:
    if day := input.date_time.date.day:
        plan: Plan = (
            db.session.query(Plan)
            .filter(Plan.user_id == user_id and Plan.time.day == day)
            .first()
        )
        return plan.title + "があります"

    return "検索: 日付を指定してください"
