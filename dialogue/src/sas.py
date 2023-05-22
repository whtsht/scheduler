import subprocess
import json
from typing import Optional
from src.info import OP, Time, Date, DateTime, InputInfo
from enum import Enum


def operation_from_str(s: Optional[str]) -> Optional[OP]:
    if s == "Refer":
        return OP.Search
    if s == "Add":
        return OP.Add
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


def response_from_dict(json) -> InputInfo:
    return InputInfo(
        json["title"],
        operation_from_str(json["operation"]),
        datetime_from_dict(json["date_time"]),
    )


class RequestType(Enum):
    All = (1,)
    Time = (2,)
    Title = (3,)


class Request:
    def __init__(self, request_type: RequestType, value: str) -> None:
        self.request_type = request_type
        self.value = value


def get_input_info(input: str) -> InputInfo:
    """文字列を入力情報に変換する

    Args:
        input (str): 入力文字列

    Returns:
        InputInfo: 予定情報
    """
    cmd = "sas"
    ret = subprocess.check_output(
        [cmd, f'{{"request_type":"All","value":"{input}"}}'], encoding="utf-8"
    )
    return response_from_dict(json.loads(ret))
