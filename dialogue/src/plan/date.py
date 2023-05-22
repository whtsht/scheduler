from src.info import DateTime, StrictDateTime
from typing import Optional
from datetime import datetime
from datetime import timedelta


# 現在の年を返す
def year() -> int:
    return (datetime.utcnow() + timedelta(hours=9)).year


def check_date_time(datetime: DateTime) -> Optional[StrictDateTime]:
    """時刻がちゃんと指定されているかチェックする

    Args:
        datetime (DateTime):
            時刻

    Returns:
        Optional[StrictDateTime]:
            時刻の月，日，時，分が指定されていればStrictDateTimeを返す．指定されていない項目がある場合，Noneを返す．
    """
    if datetime.date != None and datetime.time != None:
        date = datetime.date
        time = datetime.time
        if date.month != None and date.day != None and time.hour != None:
            return StrictDateTime(
                year() if date.year == None else date.year,
                date.month,
                date.day,
                time.hour,
                time.minute,
            )

    return None
