from logging.config import fileConfig
import os

from sqlalchemy import engine_from_config, pool
from alembic import context
from dotenv import load_dotenv

# Load .env
load_dotenv()

config = context.config

# Read DATABASE_URL from .env
config.set_main_option(
    "sqlalchemy.url",
    os.getenv("DATABASE_URL")
)

# Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Import Base
from app.database.base import Base

# Import ALL models so Alembic can detect them
from app.models.user import User
from app.models.role import Role
from app.models.activity import ActivityLog
from app.models.session import SimulationSession
from app.models.visibility import VisibilityResult
from app.models.dop import DOPResult
from app.models.positioning import PositionResult
from app.models.skyplot import SkyplotResult
from app.models.module_progress import ModuleProgress
from app.models.user_session import UserSession

target_metadata = Base.metadata


def run_migrations_offline():

    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():

    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
