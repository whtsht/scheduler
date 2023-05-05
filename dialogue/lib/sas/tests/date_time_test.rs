use sentence_analysis::date_time::{date_parser, get_date_time, time_parser, Date, DateTime, Time};
#[test]
fn date_test() {
    assert_eq!(
        date_parser("5月12日"),
        Ok((
            "",
            Date {
                year: None,
                month: Some(5),
                day: Some(12)
            }
        ))
    );
    assert_eq!(
        date_parser("６月７日"),
        Ok((
            "",
            Date {
                year: None,
                month: Some(6),
                day: Some(7)
            }
        ))
    );
    assert_eq!(
        date_parser("五月十二日"),
        Ok((
            "",
            Date {
                year: None,
                month: Some(5),
                day: Some(12)
            }
        ))
    );
    assert_eq!(
        date_parser("11/11"),
        Ok((
            "",
            Date {
                year: None,
                month: Some(11),
                day: Some(11)
            }
        ))
    );
}

#[test]
fn time_test() {
    assert_eq!(
        time_parser("8:30"),
        Ok((
            "",
            Time {
                hour: Some(8),
                minute: Some(30)
            }
        ))
    );
    assert_eq!(
        time_parser("五時五十九分"),
        Ok((
            "",
            Time {
                hour: Some(5),
                minute: Some(59)
            }
        ))
    );
}

#[test]
fn date_time_test() {
    assert_eq!(
        get_date_time("5月12日16時"),
        DateTime {
            date: Date {
                year: None,
                month: Some(5),
                day: Some(12)
            },
            time: Time {
                hour: Some(16),
                minute: Some(0)
            }
        }
    );
}
