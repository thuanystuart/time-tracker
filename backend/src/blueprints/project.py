from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS

from src.entities.utils import db
from src.entities.project import Project
from src.serializers.project import ProjectSchema
from src.blueprints.utils import RequestManager

project_page = Blueprint('project_page', __name__)
CORS(project_page, supports_credentials=True)

request_manager = RequestManager(Project, ProjectSchema, 'project')

@project_page.route('/project', methods=['GET'])
@login_required
def get_projects():
  return request_manager.get()

@project_page.route('/project', methods=['POST'])
@login_required
def add_project():
  return request_manager.add(request)

@project_page.route('/project', methods=['PUT'])
@login_required
def update_project():
  return request_manager.update(request)

@project_page.route('/project', methods=['DELETE'])
@login_required
def delete_project():
  return request_manager.delete(request)
