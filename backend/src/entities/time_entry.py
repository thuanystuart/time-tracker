from src.entities.utils import db
from datetime import datetime
from sqlalchemy import event

def current_datetime():
    return datetime.now()
class TimeEntry(db.Model):
  __tablename__ = 'time_entry'

  id = db.Column(db.Integer, primary_key=True)
  task_id = db.Column(db.Integer, db.ForeignKey("task.id", ondelete="CASCADE"), nullable=False)
  task = db.relationship('Task', back_populates='time_entries', lazy='joined')
  description = db.Column(db.String, nullable=False)
  start_datetime = db.Column(db.DateTime, default=current_datetime)
  end_datetime = db.Column(db.DateTime)

  def __init__(self, **data):
    super(TimeEntry, self).__init__(**data)

  def __getitem__(self, field):
    return self.__dict__[field]
