"""Add user and post table

Revision ID: 51ad8c3a0b92
Revises:
Create Date: 2019-05-25 07:48:27.606481

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '51ad8c3a0b92'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('user',
        sa.Column('created', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('updated', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('id', sa.INTEGER(), nullable=False),
        sa.Column('username', sa.VARCHAR(length=60), autoincrement=False, nullable=False),
        sa.Column('password_hash', sa.VARCHAR(length=128), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint('id', name='user_pkey'),
        sa.UniqueConstraint('username', name='user_username_key'),
        postgresql_ignore_search_path=False
    )
    op.create_table('post',
        sa.Column('created', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('updated', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('id', sa.INTEGER(), nullable=False),
        sa.Column('url', sa.VARCHAR(length=80), autoincrement=False, nullable=False),
        sa.Column('description', sa.TEXT(), autoincrement=False, nullable=False),
        sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='post_user_id_fkey'),
        sa.PrimaryKeyConstraint('id', name='post_pkey')
    )


def downgrade():
    op.drop_table('post')
    op.drop_table('user')
