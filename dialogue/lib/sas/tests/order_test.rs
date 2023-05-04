use sentence_analysis::date_time::{Date, DateTime, Time};
use sentence_analysis::order::{Operation, Response};
use sentence_analysis::request_all;

#[test]
fn order_add_test() {
    assert_eq!(
        request_all("5月12日16時30分にバイトがある"),
        Response {
            title: Some(String::from("バイト")),
            operation: Some(Operation::Add),
            date_time: DateTime {
                date: Date {
                    year: None,
                    month: Some(5),
                    day: Some(12)
                },
                time: Time {
                    hour: Some(16),
                    minute: Some(30)
                }
            }
        }
    );
    assert_eq!(
        request_all("バイト 5月12日10時から"),
        Response {
            title: Some(String::from("バイト")),
            operation: Some(Operation::Add),
            date_time: DateTime {
                date: Date {
                    year: None,
                    month: Some(5),
                    day: Some(12)
                },
                time: Time {
                    hour: Some(10),
                    minute: Some(0)
                }
            }
        }
    );
}

#[test]
fn order_refer_test() {
    assert_eq!(
        request_all("5月12日の予定を教えて"),
        Response {
            title: None,
            operation: Some(Operation::Refer),
            date_time: DateTime {
                date: Date {
                    year: None,
                    month: Some(5),
                    day: Some(12)
                },
                time: Time {
                    hour: None,
                    minute: None
                }
            }
        }
    );

    assert_eq!(
        request_all("5月12日の予定を教えて"),
        Response {
            title: None,
            operation: Some(Operation::Refer),
            date_time: DateTime {
                date: Date {
                    year: None,
                    month: Some(5),
                    day: Some(12)
                },
                time: Time {
                    hour: None,
                    minute: None
                }
            }
        }
    );
}
