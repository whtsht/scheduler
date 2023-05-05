from src.sas import PrePlan
from src.db_models import db, Plan


# user_id => (title, exist)
state_dict: dict[str, tuple[str, bool]] = {}


def from_message(user_id: str, input: PrePlan) -> str:
    if title := input.title:
        result = (
            db.session.query(Plan)
            .filter(Plan.user_id == user_id and Plan.title == title)
            .first()
        )
        if plan := result:
            db.session.delete(plan)
            db.session.commit()

            return "「" + title + "」の予定を削除しました"
        else:
            return title + "という名前の予定はありません"

    return "タイトルを指定してください"
