
from marshmallow import Schema
from flask_sqlalchemy.model import DefaultMeta
from flask import request, make_response
from marshmallow import ValidationError

from src.entities.utils import db

class RequestManager:
  def __init__(self, entity: DefaultMeta, schema: Schema, entity_name: str):
    self.entity_name = entity_name
    self.schema = schema()
    self.entity = entity

  def get(self):
    objects = self.entity.query.all()
    return self.schema.dump(objects, many=True)

  def add(self, request):
    try:
      created_obj = self.schema.load(request.get_json())
    except ValidationError as error:
      return make_response(error.messages, 400)

    db.session.add(created_obj)
    db.session.commit()

    return self.schema.dump(created_obj)

  def update(self, request):
    try:
      obj = self._get_object_by_id(request, from_json=True)
    except ValidationError as error:
      return make_response(error.messages, 400)

    try:
      new_obj = self.schema.load(request.get_json(), instance=obj, partial=True)
    except ValidationError as error:
      return make_response(error.messages, 400)

    db.session.commit()

    return self.schema.dump(new_obj)

  def delete(self, request):
    try:
      obj = self._get_object_by_id(request)
    except ValidationError as error:
      return make_response(error.messages, 400)

    db.session.delete(obj)
    db.session.commit()
    return make_response(f"The {self.entity_name} was successfully deleted.", 200)

  def _get_object_by_id(self, request, from_json=False):
    obj_id = request.json.get('id', None) if from_json else request.args.get('id', None)
    if obj_id is None:
      raise ValidationError({ 'id': [ "Missing data for required field." ] })

    obj = self.entity.query.get(obj_id)
    if obj is None:
      raise ValidationError({ 'id': [ f"Not a valid {self.entity_name} id." ] })

    return obj
