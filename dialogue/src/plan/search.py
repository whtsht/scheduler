from src.sas import PrePlan
from src.db_models import db, Plan


def from_message(user_id: str, input: PrePlan) -> str:
    if day := input.date_time.date.day:
        plan: Plan = (
            db.session.query(Plan)
            .filter(Plan.user_id == user_id and Plan.time.day == day)
            .first()
        )
        return "「" + plan.title + "」があります"

    return "日付を指定してください"
