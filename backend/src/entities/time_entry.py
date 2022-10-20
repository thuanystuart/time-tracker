from src.entities.utils import db
from datetime import datetime

class TimeEntry(db.Model):
  __tablename__ = 'time_entry'

  id = db.Column(db.Integer, primary_key=True)
  task_id = db.Column(db.Integer, db.ForeignKey("task.id"))
  description = db.Column(db.String, nullable=False)
  start_datetime = db.Column(db.DateTime)
  end_datetime = db.Column(db.DateTime)
