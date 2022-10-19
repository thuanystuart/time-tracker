from src.entities.utils import db
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    tasks = db.relationship('Task', backref='project', lazy=True)
