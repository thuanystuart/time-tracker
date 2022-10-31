import os
from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS

from src.entities.utils import db, migrate, login_manager
from src.serializers.utils import ma
from src.entities.project import Project
from src.entities.task import Task
from src.entities.time_entry import TimeEntry

from src.blueprints.user import user_page
from src.blueprints.task import task_page
from src.blueprints.project import project_page
from src.blueprints.time_entry import time_entry_page

load_dotenv('../.env')

POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

app = Flask(__name__)
app.app_context().push()

cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SESSION_COOKIE_SECURE'] = 'True'
app.config['SESSION_COOKIE_SAMESITE'] = 'None'

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
metadata = db.metadata
metadata.reflect(bind=db.engine)
ma.init_app(app)
migrate.init_app(app, db)
app.secret_key = os.getenv('SECRET_KEY')
login_manager.init_app(app)

app.register_blueprint(user_page)
app.register_blueprint(task_page)
app.register_blueprint(project_page)
app.register_blueprint(time_entry_page)

@app.route('/')
def index():
  return 'Hello, Time tracker!'

if __name__ == '__main__':
  app.run(threaded=True, debug=True, host='0.0.0.0', port=5000)
