use crate::date_time::{get_date_time, time_word, DateTime, Time};
use mecab::Tagger;
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;

#[derive(Debug, Serialize, PartialEq, Eq)]
pub struct Response {
    pub title: Option<String>,
    pub operation: Option<Operation>,
    pub date_time: DateTime,
}

#[derive(Debug, Deserialize, Serialize, PartialEq, Eq)]
pub struct Request {
    pub request_type: RequestType,
    pub value: String,
}

#[derive(Debug, Deserialize, Serialize, PartialEq, Eq)]
pub enum RequestType {
    All,
    Time,
    Title,
}

#[derive(Debug, Serialize, PartialEq, Eq)]
pub enum Operation {
    Add,
    Refer,
    Modify,
    Remove,
}

pub fn to_string<T: Serialize>(t: T) -> String {
    serde_json::to_string(&t).unwrap()
}

pub fn request(input: &str) -> String {
    let input = input.replace("\n", "");
    if let Ok(req) = serde_json::from_str::<Request>(&input) {
        match req.request_type {
            RequestType::All => to_string(request_all(&req.value)),
            RequestType::Time => to_string(request_time(&req.value)),
            RequestType::Title => request_title(&req.value),
        }
    } else {
        String::from("Bad Request")
    }
}

pub fn request_all(input: &str) -> Response {
    let mut tagger = Tagger::new("-d /var/unidic");

    let mut noun = Vec::new();
    let mut verb = Vec::new();
    for node in tagger.parse_to_node(input).iter_next() {
        match node.stat as i32 {
            mecab::MECAB_BOS_NODE => {}
            mecab::MECAB_EOS_NODE => {}
            _ => {
                let word = &(node.surface)[..(node.length as usize)];
                if time_word(word) {
                    continue;
                }

                if &node.feature[0..6] == "名詞" {
                    noun.push(String::from(word));
                }
                if &node.feature[0..6] == "動詞" {
                    verb.push(String::from(node.feature.split(",").nth(7).unwrap()));
                }
            }
        }
    }

    let (word, operation) = get_word_op(noun, verb);

    let response = Response {
        title: (&word != "" && &word != "予定").then(|| word),
        operation,
        date_time: get_date_time(&input),
    };

    response
}

pub fn request_time(input: &str) -> Time {
    let date_time = get_date_time(input);
    date_time.time
}

pub fn request_title(input: &str) -> String {
    let mut tagger = Tagger::new("-d ./unidic");
    let mut noun = Vec::new();
    for node in tagger.parse_to_node(input).iter_next() {
        match node.stat as i32 {
            mecab::MECAB_BOS_NODE => {}
            mecab::MECAB_EOS_NODE => {}
            _ => {
                let word = &(node.surface)[..(node.length as usize)];
                if &node.feature[0..6] == "名詞" {
                    noun.push(String::from(word));
                }
            }
        }
    }

    let mut rest = String::new();
    rest.extend(noun.into_iter());
    rest
}

fn get_word_op(noun: Vec<String>, verb: Vec<String>) -> (String, Option<Operation>) {
    for op in noun.iter().chain(verb.iter()) {
        if remove_word(&op) {
            let mut rest = String::new();
            rest.extend(noun.clone().into_iter().filter(|op_| op_ != op));
            return (rest, Some(Operation::Remove));
        }

        if modify_word(&op) {
            let mut rest = String::new();
            rest.extend(noun.clone().into_iter().filter(|op_| op_ != op));
            return (rest, Some(Operation::Modify));
        }

        if refer_word(&op) {
            let mut rest = String::new();
            rest.extend(noun.clone().into_iter().filter(|op_| op_ != op));
            return (rest, Some(Operation::Refer));
        }
    }

    let mut rest = String::new();
    rest.extend(noun.into_iter());
    (rest, Some(Operation::Add))
}

fn refer_word(s: &str) -> bool {
    static WORD: Lazy<HashSet<&str>> =
        Lazy::new(|| HashSet::from_iter(["参照", "検索", "教える"].into_iter()));
    WORD.contains(s)
}

fn modify_word(s: &str) -> bool {
    static WORD: Lazy<HashSet<&str>> = Lazy::new(|| HashSet::from_iter(["変更"].into_iter()));
    WORD.contains(s)
}

fn remove_word(s: &str) -> bool {
    static WORD: Lazy<HashSet<&str>> =
        Lazy::new(|| HashSet::from_iter(["削除", "消す"].into_iter()));
    WORD.contains(s)
}
