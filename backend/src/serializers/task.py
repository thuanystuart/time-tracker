from src.serializers.utils import ma
from src.entities.task import Task
from src.entities.project import Project
from marshmallow import fields, post_load, pre_load, validates, ValidationError
from src.serializers.project import ProjectSchema

class TaskSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Task
    load_instance = True

  time_entries = fields.Nested('TimeEntrySchema', many=True, exclude=["task"], dump_only=True)
  project = fields.Nested(ProjectSchema, only=["id", "name"], data_key="project_id", dump_only=True)
  project_id = fields.Integer(data_key="project_id", load_only=True)

  @validates('project_id')
  def validate_project(self, id, **kwargs):
    if Project.query.get(id) is None:
      raise ValidationError('Not a valid project id.')
