from enum import Enum
import subprocess
from types import SimpleNamespace
import json
from typing import Optional
from datetime import datetime


class RequestType(Enum):
    All = (1,)
    Time = (2,)
    Title = (3,)


class Request:
    def __init__(self, request_type: RequestType, value: str) -> None:
        self.request_type = request_type
        self.value = value


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
    def __init__(self, date: Date, time: Time):
        self.date = date
        self.time = time


class StrictDateTime:
    def __init__(
        self, year: int, month: int, day: int, hour: int, minute: Optional[int] = None
    ):
        self.year = year
        self.month = month
        self.day = day
        self.hour = hour
        self.minute = minute

    def into(self) -> datetime:
        return datetime(
            self.year,
            self.month,
            self.day,
            self.hour,
            0 if self.minute == None else self.minute,
        )


class OP(Enum):
    Add = (1,)
    Refer = (2,)
    Modify = (3,)
    Remove = (4,)


class PrePlan:
    def __init__(
        self, title: Optional[str], operation: Optional[OP], date_time: DateTime
    ) -> None:
        self.title = title
        self.operation = operation
        self.date_time = date_time


def operation_from_str(s: Optional[str]) -> Optional[OP]:
    if s == "Refer":
        return OP.Refer
    if s == "Add":
        return OP.Add
    if s == "Modify":
        return OP.Modify
    if s == "Remove":
        return OP.Remove

    return None


def time_from_dict(json: dict[str, Optional[int]]) -> Time:
    return Time(json["hour"], json["minute"])


def date_from_dict(json: dict[str, Optional[int]]) -> Date:
    return Date(json["year"], json["month"], json["day"])


def datetime_from_dict(json: dict[str, dict[str, Optional[int]]]) -> DateTime:
    return DateTime(
        date_from_dict(json["date"]),
        time_from_dict(json["time"]),
    )


def response_from_dict(json) -> PrePlan:
    return PrePlan(
        json["title"],
        operation_from_str(json["operation"]),
        datetime_from_dict(json["date_time"]),
    )


def get_pre_plan(input: str) -> PrePlan:
    cmd = "sas"
    ret = subprocess.check_output(
        [cmd, f'{{"request_type":"All","value":"{input}"}}'], encoding="utf-8"
    )
    return response_from_dict(json.loads(ret))
