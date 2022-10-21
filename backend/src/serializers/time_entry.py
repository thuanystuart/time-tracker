from src.serializers.utils import ma
from src.entities.time_entry import TimeEntry
from src.entities.task import Task
from marshmallow import fields, post_load, pre_load, validates, ValidationError
from src.serializers.task import TaskSchema

class TimeEntrySchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = TimeEntry
    load_instance = True

  task = fields.Nested(TaskSchema, only=["id", "description"], dump_only=True)
  task_id = fields.Integer(data_key="task_id", load_only=True, nullable=True)

  @validates('task_id')
  def validate_task(self, id, **kwargs):
    if Task.query.get(id) is None:
      raise ValidationError('Not a valid task id.')
