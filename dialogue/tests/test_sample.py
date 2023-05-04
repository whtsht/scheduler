from src.server import Mode, create_app
from src.db_models import db
import pytest
from src.db_models import Plan
from src.main import main


@pytest.fixture(scope="session")
def app():
    app = create_app(Mode.Dev)
    app.app_context().push()

    yield app

    db.drop_all()


# 1テスト毎にテーブル内のデータを削除
@pytest.fixture(scope="function", autouse=True)
def session():
    yield db.session

    db.session.query(Plan).delete()
    db.session.commit()


@pytest.fixture()
def client(app):
    return app.test_client()


def test_flask_simple(client):
    result = client.get("/")
    assert b"hello :)" == result.data


mockUserId = "mock"


def test_invalid_add():
    result = main("invalid_input", mockUserId)
    assert "追加: 無効な入力です" == result
    plans = db.session.query(Plan).all()
    assert len(plans) == 0


def test_valid_add():
    result = main("5月12日16時30分にバイトがある", mockUserId)
    assert "予定を追加しました" == result
    plans = db.session.query(Plan).filter(Plan.title == "バイト").all()
    assert len(plans) == 1


def test_search():
    result = main("5月12日16時30分にバイトがある", mockUserId)
    assert "予定を追加しました" == result

    result = main("5月12日16時30分 予定 検索", mockUserId)
    assert "バイトがあります" == result
