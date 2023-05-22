# Line Bot Server

## ファイル構成
```
src
│
├── plan            : 予定の各操作を定義
│   ├── add.py      : 追加操作
│   ├── date.py     : 日付情報の検証
│   ├── main.py     : 入力情報処理
│   ├── notif.py    : 通知処理
│   └── search.py   : 検索操作
│
├── db_models.py    : データベースのテーブル定義
├── line_bot.py     : LineAPIとの通信
├── info.py         : 予定情報，入力情報定義
├── sas.py          : 意味解析ライブラリ連携
├── server.py       : サーバー起動処理
└── web.py          : webサーバーとの通信
```