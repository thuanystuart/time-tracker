from src.serializers.utils import ma
from src.entities.project import Project
from marshmallow import fields

class ProjectSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Project
    load_instance = True

  tasks = fields.Nested('TaskSchema', many=True, exclude=["project"], dump_only=True)
