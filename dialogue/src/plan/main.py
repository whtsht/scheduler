from src.sas import get_input_info
from src.info import OP, PlanInfo, InputInfo
from src.plan import add, search
from db_models import Plan
from typing import Optional


class UserState:
    """利用者の入力情報を表す
    Attributes:
        op (OP):
            操作
        completed (bool):
            処理が完了したかどうか
        plan_info (PlanInfo):
            予定情報
        plan_list (Optional[list[Plan]]):
            検索した予定のリスト．追加操作では使わない
    """

    def __init__(
        self,
        op: OP,
        completed: bool,
        plan_info: PlanInfo,
        plan_list: Optional[list[Plan]],
    ):
        self.op = op
        self.completed = completed
        self.plan_info = plan_info
        self.plan_list = plan_list


# 利用者がどの作業の途中であるかを表す
# 例えば { "line_xxx" : UserState { op: Add, completed: False, title: "映画を見に行く", date_time: None, plan_list: None } }
# というデータが格納されていたらLineIDが"line_xxx"の利用者が予定の追加処理を行っていて
# 「映画を見に行く」という予定名は指定されているが，時刻情報が不足していることを表す
states: dict[str, UserState] = {}


# 利用者からの入力を受け取り，返答する
def main(message: str, line_id: str) -> str:
    # 文字列 -> 入力情報
    input_info = get_input_info(message)

    input_info = integrate_input(line_id, input_info)

    op = input_info.op
    plan_info = input_info.into_plan_info()

    if op == OP.Add:
        completed = add.from_message(line_id, plan_info)
        states[line_id] = UserState(op, completed, plan_info, None)
    if op == OP.Search:
        plan_list = search.from_message(line_id, plan_info)
        completed = len(plan_list) != 0
        states[line_id] = UserState(op, completed, plan_info, plan_list)

    return gen_message(line_id)


# TODO
# 利用者の状態と入力を統合
def integrate_input(line_id: str, input_info: InputInfo) -> InputInfo:
    state = states[line_id]
    if state := state:
        return InputInfo(
            state.plan_info.title or input_info.title,
            state.op or input_info.op,
            state.plan_info.start_time or input_info.start_time,
        )
    else:
        return input_info


# TODO
# 利用者の状態に応じてメッセージを生成
# 動作が完了しているならばstatesから削除
def gen_message(line_id) -> str:
    if line_id in states:
        state = states[line_id]
        if state.completed:
            states.pop(line_id)

            if state.op == OP.Add:
                return add.complited_message(state.plan_info)
            if state.op == OP.Search:
                if plan_list := state.plan_list:
                    return search.complited_message(state.plan_info, plan_list)
                else:
                    # 検索クエリの場合は必ずplan_listに値が入っている
                    # よってここには到達しない
                    return "Error: unreachable"
        else:
            if state.op == OP.Add:
                return add.uncomplited_message(state.plan_info)
            if state.op == OP.Search:
                return search.uncomplited_message(state.plan_info)

    return "無効な入力です"
