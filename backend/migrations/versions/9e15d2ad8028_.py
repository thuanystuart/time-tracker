"""empty message

Revision ID: 9e15d2ad8028
Revises: d73c7be9c4a8
Create Date: 2022-11-04 20:04:41.506875

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = '9e15d2ad8028'
down_revision = 'd73c7be9c4a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('time_entry_task_id_fkey', 'time_entry', type_='foreignkey')
    op.create_foreign_key(None, 'time_entry', 'task', ['task_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'time_entry', type_='foreignkey')
    op.create_foreign_key('time_entry_task_id_fkey', 'time_entry', 'task', ['task_id'], ['id'])
    # ### end Alembic commands ###
