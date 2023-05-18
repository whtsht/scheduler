# Line Bot Server

## ファイル構成
```
src
├── db_models.py    : データベースのテーブル定義
│
├── line_bot.py     : LineAPIとの通信
│
├── plan
│   ├── add.py      : 追加操作
│   ├── request.py  : ユーザーに対し入力要求を送る
│   ├── main.py     : 入力情報処理
│   ├── notif.py    : 通知処理
│   └── search.py   : 検索操作
│
├── sas.py          : 意味解析ライブラリ連携
├── server.py       : サーバー起動処理
└── web.py          : webサーバーとの通信
```