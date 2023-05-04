from src.sas import StrictDateTime, PrePlan
from src.plan.date import check_date_time
from src.db_models import db, Plan


def from_message(user_id: str, input: PrePlan) -> str:
    if (datetime := input.date_time) and (title := input.title):
        if st_time := check_date_time(datetime):
            from_form(title, user_id, st_time, st_time)
            return "予定を追加しました"
    return "追加: 無効な入力です"


def from_form(
    title: str, user_id: str, time: StrictDateTime, notification: StrictDateTime
):
    plan = Plan(title, user_id, time, notification)

    db.session.add(plan)
    db.session.commit()
