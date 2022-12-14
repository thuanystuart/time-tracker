from src.entities.utils import db
from datetime import datetime
from flask_login import current_user

class Project(db.Model):
  __tablename__ = 'project'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, unique=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
  tasks = db.relationship('Task', backref='project', lazy=True)

  def __init__(self, **data):
    super(Project, self).__init__(**data, user_id=current_user.id)
