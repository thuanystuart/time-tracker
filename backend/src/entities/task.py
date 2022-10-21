from src.entities.utils import db
from datetime import datetime

def current_datetime():
    return datetime.now()

class Task(db.Model):
  __tablename__ = 'task'

  id = db.Column(db.Integer, primary_key=True)
  description = db.Column(db.String, nullable=False)
  start_datetime = db.Column(db.DateTime, default=current_datetime)
  end_datetime = db.Column(db.DateTime)

  user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey("project.id"))

  time_entries = db.relationship('TimeEntry', backref='task', lazy=True)

