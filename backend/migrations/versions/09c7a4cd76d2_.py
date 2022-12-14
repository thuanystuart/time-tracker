"""empty message

Revision ID: 09c7a4cd76d2
Revises: 
Create Date: 2022-10-19 16:11:07.914124

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09c7a4cd76d2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('start_datetime', sa.DateTime(), nullable=True),
    sa.Column('end_datetime', sa.DateTime(), nullable=True),
    sa.Column('project', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project'], ['project.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('time_entry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('start_datetime', sa.DateTime(), nullable=True),
    sa.Column('end_datetime', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['task_id'], ['task.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('time_entry')
    op.drop_table('task')
    op.drop_table('project')
    # ### end Alembic commands ###
