import src.server
from src.db_models import db
import pytest
from src.db_models import Plan
from src.main import main


@pytest.fixture(scope="session")
def app():
    app = src.server.app

    # Setup
    app.app_context().push()
    src.server.config_dev()

    # Test app
    yield app

    # Clean up / reset resources
    db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_flask_simple(client):
    result = client.get("/")
    assert b"hello :)" == result.data


mockUserId = "mock"


def test_invalid_add():
    result = main("invalid_input", mockUserId)
    assert "無効な入力です" == result
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
