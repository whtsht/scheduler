from src.sas import StrictDateTime, PrePlan
from src.plan.date import check_date_time
from src.db_models import db, Plan
from src.plan.notif import add_notification


def from_message(user_id: str, input: PrePlan) -> str:
    if (datetime := input.date_time) and (title := input.title):
        if st_time := check_date_time(datetime):
            plan = (
                db.session.query(Plan)
                .filter(Plan.title == title)
                .filter(Plan.user_id == user_id)
                .filter(Plan.time == st_time.into())
                .first()
            )
            if plan != None:
                return "「" + title + "」は同じ時間に既に追加されています"

            from_form(title, user_id, st_time, st_time)
            add_notification(user_id, title, st_time.into())
            return str(st_time.into()) + "に「" + title + "」を追加しました"
    return "日付とタイトルを指定してください"


def from_form(
    title: str, user_id: str, time: StrictDateTime, notification: StrictDateTime
):
    plan = Plan(title, user_id, time, notification)

    db.session.add(plan)
    db.session.commit()
