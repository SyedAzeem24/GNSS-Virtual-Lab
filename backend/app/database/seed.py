from sqlalchemy.orm import Session

from app.models.role import Role


def seed_roles(db: Session):

    roles = [
        "Admin",
        "Instructor",
        "Student"
    ]

    for role in roles:

        existing = db.query(Role).filter(Role.name == role).first()

        if not existing:
            db.add(Role(name=role))

    db.commit()