from src.serializers.utils import ma
from src.entities.user import User

class UserSchema(ma.SQLAlchemySchema):
  class Meta:
    model = User

  id = ma.auto_field()
  email = ma.auto_field()
  first_name = ma.auto_field()
  last_name = ma.auto_field()
