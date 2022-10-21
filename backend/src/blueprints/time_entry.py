from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS
from marshmallow import ValidationError

from src.entities.utils import db
from src.entities.time_entry import TimeEntry
from src.serializers.time_entry import TimeEntrySchema
from src.blueprints.utils import RequestManager

time_entry_page = Blueprint('time_entry_page', __name__)
CORS(time_entry_page, supports_credentials=True)

request_manager = RequestManager(TimeEntry, TimeEntrySchema, 'time entry')

@time_entry_page.route('/time_entry', methods=['GET'])
@login_required
def get_time_entrys():
  return request_manager.get()

@time_entry_page.route('/time_entry', methods=['POST'])
@login_required
def add_time_entry():
  return request_manager.add(request)

@time_entry_page.route('/time_entry', methods=['PUT'])
@login_required
def update_time_entry():
  return request_manager.update(request)

@time_entry_page.route('/time_entry', methods=['DELETE'])
@login_required
def delete_time_entry():
  return request_manager.delete(request)
