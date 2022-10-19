from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS

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
    description = request.json.get('description')
    project_id = request.json.get('project_id')

    new_task = Task(
      description=description,
      project_id=int(project_id),
      )

    db.session.add(new_task)
    db.session.commit()
    return TaskSchema().dump(new_task)

@task_page.route('/task', methods=['DELETE'])
def delete_task():
    id = request.args.get('id')
    Task.query.filter_by(id=id).delete()
    db.session.commit()
    return make_response("The task was successfully deleted.", 200)
