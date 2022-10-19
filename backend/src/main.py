import os
from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS

from src.entities.db import db, migrate
from src.entities.project import Project
from src.entities.task import Task
from src.entities.time_entry import TimeEntry

load_dotenv()

POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

app = Flask(__name__)
app.app_context().push()

cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
metadata = db.metadata
metadata.reflect(bind=db.engine)
migrate.init_app(app, db)

# with app.app_context():
#     db.create_all()

@app.route('/')
def index():
    return 'Hello, Time tracker!'

if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=5001, debug=True)
