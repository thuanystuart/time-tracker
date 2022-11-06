from src.entities.utils import db
from datetime import datetime
from sqlalchemy import event

def current_datetime():
    return datetime.now()
class TimeEntry(db.Model):
  __tablename__ = 'time_entry'

  id = db.Column(db.Integer, primary_key=True)
  task_id = db.Column(db.Integer, db.ForeignKey("task.id", ondelete="CASCADE"), nullable=False)
  description = db.Column(db.String, nullable=False)
  start_datetime = db.Column(db.DateTime, default=current_datetime)
  end_datetime = db.Column(db.DateTime)

@event.listens_for(TimeEntry.start_datetime, 'set')
def update_task_start(time_entry, new_start, oldValue, initiator):
  task = time_entry.task
  if task is not None and (task.start_datetime is None or task.start_datetime > new_start):
    task.start_datetime = new_start

@event.listens_for(TimeEntry.end_datetime, 'set')
def update_task_end(time_entry, new_end, oldValue, initiator):
  task = time_entry.task
  if task is not None and (task.end_datetime is None or task.end_datetime < new_end):
    task.end_datetime = new_end

@event.listens_for(TimeEntry, 'after_delete')
def receive_after_delete(mapper, connection, time_entry):
  task = time_entry.task
  if len(task.time_entries) == 0:
    db.session.delete(task)
