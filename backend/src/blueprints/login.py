from flask_login import login_user, login_required, logout_user, current_user
from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS

from src.entities.db import login_manager, db
from src.entities.user import User

login_page = Blueprint('login_page', __name__)
CORS(login_page, supports_credentials=True)

@login_manager.user_loader
def load_user(user_id):
    print(User.query.filter_by(id=user_id).first())
    return User.query.filter_by(id=user_id).first()

@login_page.route('/current_user', methods=['GET'])
@login_required
def get_current_user():
  return {'user': current_user.serialize}

@login_page.route('/login', methods=['GET', 'POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    try:
      remember = request.json.get('remember_me')
    except:
      remember = True

    user = User.query.filter_by(email=email).first()

    if user:
        if user.check_password(password):
            login_user(user, remember=remember)
            return {'user': user.serialize}
        else:
            return make_response(jsonify("Wrong password. Try again!"), 401)
    else:
        return make_response(jsonify("User is not registered!"), 401)


@login_page.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return make_response(jsonify("Successfully logged out!"), 200)

@login_page.route('/signup', methods=['GET', 'POST'])
def signup():
    email = request.json.get('email')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')

    existing_user = User.query.filter_by(email=email).first()

    if existing_user is None:
        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        db.session.add(user)
        db.session.commit()

        login_user(user)
        return {'user': user.serialize}
    else:
      return make_response(jsonify("This email is already registered, user was not created!"), 401)
    return make_response(jsonify("Something went wrong, user was not created!"), 401)

@login_page.route('/user', methods=['DELETE'])
@login_required
def delete_user():
    User.query.filter_by(id=current_user.id).delete()
    logout_user()
    db.session.commit()
    return make_response(jsonify("The user was successfully deleted!"), 200)
