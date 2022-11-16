from src.entities.utils import db
from datetime import datetime
from flask_login import current_user
from src.entities.time_entry import TimeEntry
from sqlalchemy import event

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

  time_entries = db.relationship(TimeEntry, back_populates='task', lazy=True, order_by=TimeEntry.end_datetime, cascade="all, delete, delete-orphan")

  def __init__(self, **data):
    self.time_entries = [
      TimeEntry(
        description = data['description'],
        start_datetime = data['start_datetime'],
        end_datetime = data['end_datetime']
      )
    ]
    super(Task, self).__init__(**data, user_id=current_user.id)

  def __getitem__(self, field):
    if field == 'time_entries':
      return self.time_entries
    return self.__dict__[field]

@event.listens_for(Task.time_entries, 'append', propagate=True)
def task_entry_listener(task, time_entry, initiator):
  if len(task.time_entries) > 0:
    if task.start_datetime.timestamp() > time_entry.start_datetime.timestamp():
      task.start_datetime = time_entry.start_datetime

    if task.end_datetime.timestamp() < time_entry.end_datetime.timestamp():
      task.end_datetime = time_entry.end_datetime

@event.listens_for(Task.time_entries, 'remove', propagate=True)
def task_removal_listener(task, time_entry, initiator):
  if (len(task.time_entries) <= 1):
    db.session.delete(task)

  if (task.start_datetime.timestamp() == time_entry.start_datetime.timestamp()):
    task.start_datetime = task.time_entries[1].start_datetime

  if (task.end_datetime.timestamp() == time_entry.end_datetime.timestamp()):
    task.end_datetime = task.time_entries[-2].end_datetime

