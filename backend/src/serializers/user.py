from marshmallow import fields

from src.serializers.utils import ma
from src.entities.user import User

class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = User
    load_instance = True
    exclude = ['password']

  tasks = fields.Nested('TaskSchema', only=["id", "description"], dump_only=True, many=True)
  projects = fields.Nested('ProjectSchema', only=["id", "name"], dump_only=True, many=True)
