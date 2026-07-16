from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Database
from app.database.database import engine
from app.database.base import Base
from app.database.database import SessionLocal
from app.database.seed import seed_roles

# Import ALL models
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

# Routers
from app.api.education import router as education_router
from app.api.visibility import router as visibility_router
from app.api.skyplot import router as skyplot_router
from app.api.dop import router as dop_router
from app.api.auth import router as auth_router
from app.api.positioning import router as positioning_router
from app.api.session import router as session_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(Base.metadata.tables.keys())
   
    db = SessionLocal()

    seed_roles(db)

    db.close()

    yield


app = FastAPI(
    title="GNSS Virtual Lab Backend",
    lifespan=lifespan
)

# 🔒 CORS Middleware Configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🗺️ Include All Routers
app.include_router(education_router)
app.include_router(visibility_router)
app.include_router(skyplot_router, prefix="/skyplot", tags=["Sky Plot"])
app.include_router(dop_router)
app.include_router(auth_router)
app.include_router(positioning_router)
app.include_router(session_router)

@app.get("/")
def home():
    return {
        "message": "GNSS Virtual Lab Backend Running Successfully"
    }
    