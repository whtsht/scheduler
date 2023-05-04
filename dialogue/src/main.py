from src.sas import get_pre_plan, OP
from src.plan import add, search


def main(message: str, user_id: str) -> str:
    res = get_pre_plan(message)
    if res.operation == OP.Add:
        return add.from_message(user_id, res)
    if res.operation == OP.Refer:
        return search.from_message(user_id, res)

    return "無効な入力です"
