from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS
from marshmallow import ValidationError

from src.entities.utils import db
from src.entities.task import Task
from src.serializers.task import TaskSchema
from src.blueprints.utils import RequestManager

task_page = Blueprint('task_page', __name__)
CORS(task_page, supports_credentials=True)

request_manager = RequestManager(Task, TaskSchema, 'task')

@task_page.route('/task', methods=['GET'])
def get_tasks():
  return request_manager.get()

@task_page.route('/task', methods=['POST'])
def add_task():
  return request_manager.add(request)

@task_page.route('/task', methods=['PUT'])
def update_task():
  return request_manager.update(request)

@task_page.route('/task', methods=['DELETE'])
def delete_task():
  return request_manager.delete(request)
