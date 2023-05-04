import subprocess
from enum import Enum
from typing import Optional
from types import SimpleNamespace
import json


class RequestType(Enum):
    All = 1,
    Time = 2,
    Title = 3,


class Request:
    def __init__(self, request_type: RequestType, value: str):
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
    def __init__(self, date: Optional[Date], time: Optional[Time]):
        self.date = date
        self.time = time


class Operation(Enum):
    Add = 1,
    Refer = 2,
    Modify = 3,
    Remove = 4,


class Response:
    def __init__(self, title: Optional[str], operation: Optional[Operation], date_time: Optional[DateTime]) -> None:
        self.title = title
        self.operation = operation
        self.date_time = date_time


cmd = "./target/release/cli"

# f'{{"request_type":"All","value":"{input}"}}'
def get_response(input: str) -> Response:
    ret = subprocess.check_output([cmd, ""], encoding="utf-8")
    cls: Response = json.loads(ret, object_hook=lambda d: SimpleNamespace(**d))
    return cls

input = "明日にバイト"

arg = f'{{"request_type":"All","value":"{input}"}}'
print(arg)
ret = subprocess.check_output(
    [cmd, arg], encoding="utf-8")
print(ret)

