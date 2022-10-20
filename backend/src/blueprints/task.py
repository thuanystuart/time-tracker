from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS
from marshmallow import ValidationError

from src.entities.utils import db
from src.entities.task import Task
from src.serializers.task import TaskSchema

task_page = Blueprint('task_page', __name__)
CORS(task_page, supports_credentials=True)

@task_page.route('/task', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return TaskSchema().dump(tasks, many=True)

@task_page.route('/task', methods=['POST'])
def add_task():
    try:
      new_task = TaskSchema().load(request.get_json())
    except ValidationError as error:
      return make_response(error.messages, 400)

    db.session.add(new_task)
    db.session.commit()

    return TaskSchema().dump(new_task)

@task_page.route('/task', methods=['PUT'])
def update_task():
    updated_task = request.get_json()

    task_id = updated_task.get('id', None)
    if task_id is None:
      return make_response({ 'id': [ "Missing data for required field." ] }, 400)

    task_to_update = Task.query.get(task_id)
    if task_to_update is None:
      return make_response({ 'id': [ "Not a valid task id." ] }, 400)

    try:
      new_task = TaskSchema().load(updated_task, instance=task_to_update, partial=True)
    except ValidationError as error:
      return make_response(error.messages, 400)

    db.session.commit()

    return TaskSchema().dump(new_task)

@task_page.route('/task', methods=['DELETE'])
def delete_task():
    task_id = request.args.get('id')
    if task_id is None:
      return make_response({ 'id': [ "Missing data for required field." ] }, 400)

    task_to_delete = Task.query.get(task_id)
    if task_to_delete is None:
      return make_response({ 'id': [ "Not a valid task id." ] }, 400)

    task_to_delete.delete()
    db.session.commit()
    return make_response("The task was successfully deleted.", 200)
