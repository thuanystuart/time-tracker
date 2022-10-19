from src.serializers.utils import ma
from src.entities.project import Project
from marshmallow import fields

class ProjectSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Project

    id = ma.auto_field()
    name = ma.auto_field()
    tasks = fields.Nested('TaskSchema', many=True, exclude=["project"])
