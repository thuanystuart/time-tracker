from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS

from src.entities.utils import db
from src.entities.project import Project
from src.serializers.project import ProjectSchema

project_page = Blueprint('project_page', __name__)
CORS(project_page, supports_credentials=True)

@project_page.route('/project', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return ProjectSchema().dump(projects, many=True)

@project_page.route('/project', methods=['POST'])
def add_project():
    name = request.json.get('name')

    new_project = Project(
      name=name,
      )

    db.session.add(new_project)
    db.session.commit()
    return ProjectSchema().dump(new_project)

@project_page.route('/project', methods=['DELETE'])
def delete_project():
    id = request.args.get('id')
    Project.query.filter_by(id=id).delete()
    db.session.commit()
    return make_response("The project was successfully deleted.", 200)
