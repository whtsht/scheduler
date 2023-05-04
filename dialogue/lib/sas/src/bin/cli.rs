use std::env;

use sentence_analysis::request;

fn main() {
    let mut args = env::args();

    if let Some(input) = args.nth(1) {
        println!("{}", request(&input));
    } else {
        println!("Null");
    }
}
