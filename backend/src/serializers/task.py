from src.serializers.utils import ma
from src.entities.task import Task
from marshmallow import fields
from src.serializers.project import ProjectSchema

class TaskSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Task

    id = ma.auto_field()
    description = ma.auto_field()
    start_datetime = fields.DateTime()
    end_datetime = fields.DateTime()
    project = fields.Nested(ProjectSchema, only=["id", "name"], data_key="project_id")
