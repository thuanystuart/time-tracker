"""empty message

Revision ID: d73c7be9c4a8
Revises: 87f850f41838
Create Date: 2022-10-21 15:11:47.250961

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = 'd73c7be9c4a8'
down_revision = '87f850f41838'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('time_entry', 'task_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('time_entry', 'task_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###