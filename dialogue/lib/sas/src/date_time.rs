use nom::{
    branch::alt,
    bytes::complete::take_while,
    combinator::{map, map_opt},
    multi::many0,
    sequence::{preceded, terminated, tuple},
    IResult,
};
use serde::Serialize;

#[derive(Debug, Serialize, PartialEq, Eq)]
pub struct Date {
    pub year: Option<u16>,
    pub month: Option<u8>,
    pub day: Option<u8>,
}

impl Date {
    fn new(year: Option<u16>, month: Option<u8>, day: Option<u8>) -> Self {
        Self { year, month, day }
    }
}

#[derive(Debug, Serialize, PartialEq, Eq)]
pub struct Time {
    pub hour: Option<u8>,
    pub minute: Option<u8>,
}

impl Time {
    fn new(hour: Option<u8>, minute: Option<u8>) -> Self {
        Self { hour, minute }
    }
}

#[derive(Debug, Serialize, PartialEq, Eq)]
pub struct DateTime {
    pub date: Date,
    pub time: Time,
}

impl DateTime {
    fn new(date: Date, time: Time) -> Self {
        Self { date, time }
    }
}

fn spaces(input: &str) -> IResult<&str, ()> {
    map(take_while(move |c| " 　\t\n".contains(c)), |_| ())(input)
}

fn char<'a>(target: char) -> impl FnMut(&'a str) -> IResult<&'a str, char> {
    preceded(
        spaces,
        terminated(nom::character::complete::char(target), spaces),
    )
}

pub fn tag<'a>(target: &'a str) -> impl FnMut(&'a str) -> IResult<&'a str, &'a str> {
    preceded(
        spaces,
        terminated(nom::bytes::complete::tag(target), spaces),
    )
}

fn one_of<'a>(target: &'a str) -> impl FnMut(&'a str) -> IResult<&'a str, char> {
    preceded(
        spaces,
        terminated(nom::character::complete::one_of(target), spaces),
    )
}

fn ascii_digits(input: &str) -> IResult<&str, u32> {
    let one_digit = alt((
        one_of("123456789"),
        map(one_of("１２３４５６７８９"), upper_to_digit),
    ));

    let many_digit = many0(alt((
        one_of("1234567890"),
        map(one_of("１２３４５６７８９０"), upper_to_digit),
    )));

    alt((
        map(tuple((one_digit, many_digit)), |(a, b)| {
            let mut digits = String::new();
            digits.push(a);
            digits.extend(b);
            digits.parse().unwrap()
        }),
        map(alt((char('0'), char('０'))), |_| 0),
    ))(input)
}

fn kanzi_to_digit(s: char) -> u32 {
    match s {
        '一' => 1,
        '二' => 2,
        '三' => 3,
        '四' => 4,
        '五' => 5,
        '六' => 6,
        '七' => 7,
        '八' => 8,
        '九' => 9,
        '〇' => 0,
        _ => unreachable!(),
    }
}

fn upper_to_digit(s: char) -> char {
    match s {
        '１' => '1',
        '２' => '2',
        '３' => '3',
        '４' => '4',
        '５' => '5',
        '６' => '6',
        '７' => '7',
        '８' => '8',
        '９' => '9',
        '０' => '0',
        _ => unreachable!(),
    }
}

fn kanzi_digit(input: &str) -> IResult<&str, u32> {
    map(one_of("一二三四五六七八九〇"), kanzi_to_digit)(input)
}

fn simple_kanzi_digits(input: &str) -> IResult<&str, u32> {
    alt((
        map(
            tuple((
                map(one_of("一二三四五六七八九"), kanzi_to_digit),
                map(many0(one_of("一二三四五六七八九〇")), |v| {
                    v.into_iter().map(kanzi_to_digit).collect::<Vec<_>>()
                }),
            )),
            |(a, mut b)| {
                let mut m = 1;
                let mut sum = 0;
                while let Some(e) = b.pop() {
                    sum += e * m;
                    m *= 10;
                }
                sum += a * m;
                sum
            },
        ),
        map(char('〇'), |_| 0),
    ))(input)
}

fn complex_kanzi_digits(input: &str) -> IResult<&str, u32> {
    fn zyu(input: &str) -> IResult<&str, u32> {
        alt((
            map(
                tuple((kanzi_digit, char('十'), kanzi_digit)),
                |(z, _, i)| z * 10 + i,
            ),
            map(tuple((char('十'), kanzi_digit)), |(_, i)| i + 10),
            map(char('十'), |_| 10),
        ))(input)
    }

    fn hyaku(input: &str) -> IResult<&str, u32> {
        alt((
            map(tuple((kanzi_digit, char('百'), zyu)), |(h, _, z)| {
                h * 100 + z
            }),
            map(tuple((char('百'), zyu)), |(_, z)| z + 100),
            map(char('百'), |_| 100),
        ))(input)
    }

    alt((hyaku, zyu, kanzi_digit))(input)
}

fn digits(input: &str) -> IResult<&str, u32> {
    alt((ascii_digits, complex_kanzi_digits, simple_kanzi_digits))(input)
}

#[test]
fn digits_test() {
    assert_eq!(digits("12"), Ok(("", 12)));
    assert_eq!(digits("十八"), Ok(("", 18)));
}

fn year(input: &str) -> IResult<&str, u16> {
    map_opt(digits, |year| {
        (1900 <= year && year <= 2100).then(|| year as u16)
    })(input)
}

fn month(input: &str) -> IResult<&str, u8> {
    map_opt(digits, |month| {
        (1 <= month && month <= 12).then(|| month as u8)
    })(input)
}

fn day(input: &str) -> IResult<&str, u8> {
    map_opt(digits, |day| (1 <= day && day <= 31).then(|| day as u8))(input)
}

fn hour(input: &str) -> IResult<&str, u8> {
    map_opt(digits, |hour| (hour <= 23).then(|| hour as u8))(input)
}

fn minute(input: &str) -> IResult<&str, u8> {
    map_opt(digits, |minute| (minute <= 59).then(|| minute as u8))(input)
}

fn slash(input: &str) -> IResult<&str, char> {
    alt((char('/'), char('／')))(input)
}

pub fn colon(input: &str) -> IResult<&str, char> {
    alt((char(':'), char('：')))(input)
}

fn get_day(offset: u8) -> Date {
    use chrono::prelude::{Datelike, FixedOffset, Utc};
    let dt = Utc::now().with_timezone(&FixedOffset::east_opt(9 * 3600).unwrap());
    Date::new(
        Some(dt.year() as u16),
        Some(dt.month() as u8),
        Some(dt.day() as u8 + offset),
    )
}

pub fn date(input: &str) -> IResult<&str, Date> {
    alt((
        alt((
            // 今日
            map(tag("今日"), |_| get_day(0)),
            // 明日
            map(tag("明日"), |_| get_day(1)),
            // 明後日
            map(tag("明後日"), |_| get_day(2)),
            // 明々後日
            map(tag("明々後日"), |_| get_day(3)),
            // <month>/<day>
            map(tuple((month, slash, day)), |(month, _, day)| {
                Date::new(None, Some(month), Some(day))
            }),
            // <year>/<month>/<day>
            map(
                tuple((year, slash, month, slash, day)),
                |(year, _, month, _, day)| Date::new(Some(year), Some(month), Some(day)),
            ),
            // <month>/<day>
            map(tuple((month, slash, day)), |(month, _, day)| {
                Date::new(None, Some(month), Some(day))
            }),
            // 5月23日
            map(
                tuple((month, char('月'), day, char('日'))),
                |(month, _, day, _)| Date::new(None, Some(month), Some(day)),
            ),
        )),
        map(tag(""), |_| Date::new(None, None, None)),
    ))(input)
}

pub fn time(input: &str) -> IResult<&str, Time> {
    alt((
        alt((
            // X:XX
            map(tuple((hour, colon, minute)), |(hour, _, minute)| {
                Time::new(Some(hour), Some(minute))
            }),
            // X時X分
            map(
                tuple((hour, char('時'), minute, char('分'))),
                |(hour, _, minute, _)| Time::new(Some(hour), Some(minute)),
            ),
            // X時
            map(tuple((hour, char('時'))), |(hour, _)| {
                Time::new(Some(hour), Some(0))
            }),
        )),
        map(tag(""), |_| Time::new(None, None)),
    ))(input)
}

fn snd<A, B>((_, b): (A, B)) -> B {
    b
}

pub fn get_date_time(input: &str) -> DateTime {
    snd(alt((
        map(tuple((date, time)), |(date, time)| DateTime { date, time }),
        map(tuple((time, date)), |(time, date)| DateTime { date, time }),
        map(tag(""), |_| {
            DateTime::new(Date::new(None, None, None), Time::new(None, None))
        }),
    ))(input)
    .unwrap())
}
