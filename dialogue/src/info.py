from typing import Optional
from datetime import datetime
from enum import Enum


class Date:
    def __init__(self, year: Optional[int], month: Optional[int], day: Optional[int]):
        self.year = year
        self.month = month
        self.day = day


class Time:
    def __init__(self, hour: Optional[int], minute: Optional[int]):
        self.hour = hour
        self.minute = minute


class DateTime:
    """曖昧な時刻情報を格納する

    例)
        各要素が入っていない可能性がある
        2023/05/15 XX:XX
        XXXX/XX/XX XX:XX
        XXXX/11/11 09:XX
    """

    def __init__(self, date: Date, time: Time):
        self.date = date
        self.time = time


class StrictDateTime:
    """厳密な時刻情報を格納する

    例)
        分以外は指定する必要がある
        2023/05/15 14:30
        2023/11/11 09:XX
    """

    def __init__(
        self, year: int, month: int, day: int, hour: int, minute: Optional[int] = None
    ):
        self.year = year
        self.month = month
        self.day = day
        self.hour = hour
        self.minute = minute

    def into(self) -> datetime:
        """データベースに格納できるように値を変換

        Returns:
            datetime
        """
        return datetime(
            self.year,
            self.month,
            self.day,
            self.hour,
            0 if self.minute == None else self.minute,
        )


class OP(Enum):
    """操作
    Add:
        追加
    Search:
        検索
    """

    Add = (1,)
    Search = (2,)


class PlanInfo:
    """予定情報
    Attributes:
        title (Optional[str]):
            予定名
        start_time (DateTime):
            開始時刻
    """

    def __init__(self, title: Optional[str], start_time: DateTime):
        self.title = title
        self.start_time = start_time


class InputInfo:
    """入力情報
    Attributes:
        title (str):
            予定名
        op (OP):
            操作
        start_time (DateTime):
            開始時刻

    """

    def __init__(
        self,
        title: Optional[str],
        operation: Optional[OP],
        start_time: DateTime,
    ) -> None:
        self.title = title
        self.op = operation
        self.start_time = start_time

    def into_plan_info(self) -> PlanInfo:
        """入力情報から予定情報への変換

        Returns:
            PlanInfo: 予定情報
        """
        return PlanInfo(self.title, self.start_time)
