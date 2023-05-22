from src.info import DateTime, StrictDateTime
from typing import Optional
from datetime import datetime
from datetime import timedelta


def year() -> int:
    return (datetime.utcnow() + timedelta(hours=9)).year


def check_date_time(datetime: DateTime) -> Optional[StrictDateTime]:
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
