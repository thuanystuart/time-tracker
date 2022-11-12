from flask import Blueprint, request, make_response, jsonify
from flask_login import login_required
from flask_cors import CORS
from marshmallow import ValidationError

from src.entities.utils import db
from src.entities.time_entry import TimeEntry
from src.entities.task import Task
from src.serializers.time_entry import TimeEntrySchema
from src.serializers.task import TaskSchema
from src.blueprints.utils import RequestManager

time_entry_page = Blueprint('time_entry_page', __name__)
CORS(time_entry_page, supports_credentials=True)

request_manager = RequestManager(TimeEntry, TimeEntrySchema, 'time entry')

@time_entry_page.route('/time_entry', methods=['POST'])
@login_required
def add_time_entry():
  return request_manager.add_child(request, parent_entity=Task, parent_schema=TaskSchema(), parent_key='time_entries', child_key='task_id', return_parent=True)

@time_entry_page.route('/time_entry', methods=['PUT'])
@login_required
def update_time_entry():
  return request_manager.update(request)

@time_entry_page.route('/time_entry', methods=['DELETE'])
@login_required
def delete_time_entry():
  return request_manager.remove_child(request, parent_entity=Task, parent_schema=TaskSchema(), parent_key='time_entries', child_key='task', return_parent=True)
