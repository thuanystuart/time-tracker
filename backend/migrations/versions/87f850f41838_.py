"""empty message

Revision ID: 87f850f41838
Revises: 5e97a84660f4
Create Date: 2022-10-20 14:57:23.487776

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = '87f850f41838'
down_revision = '5e97a84660f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'project', 'user', ['user_id'], ['id'])
    op.execute("UPDATE project SET user_id = 6")
    op.alter_column('project', 'user_id', nullable=False)
    op.add_column('task', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'task', 'user', ['user_id'], ['id'])
    op.execute("UPDATE task SET user_id = 6")
    op.alter_column('task', 'user_id', nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'task', type_='foreignkey')
    op.drop_column('task', 'user_id')
    op.drop_constraint(None, 'project', type_='foreignkey')
    op.drop_column('project', 'user_id')
    # ### end Alembic commands ###
