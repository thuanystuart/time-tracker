from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from src.entities.utils import db
from sqlalchemy_utils import EmailType, PasswordType, force_auto_coercion

force_auto_coercion()

class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, unique=True, nullable=False)
    password = db.Column(PasswordType(
        schemes=[
            'pbkdf2_sha512',
            'md5_crypt'
        ],
        deprecated=['md5_crypt']), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    def set_password(self, password):
        self.password = password

    def check_password(self, password):
        return self.password == password

    @property
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }

    def __repr__(self):
        return '<User {} {}>'.format(self.first_name, self.last_name)
