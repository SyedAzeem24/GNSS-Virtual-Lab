from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.education import router as education_router
from app.api.visibility import router as visibility_router

app = FastAPI(
    title="GNSS Virtual Lab"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(education_router)
app.include_router(visibility_router)


@app.get("/")
def home():
    return {
        "message": "GNSS Virtual Lab Backend Running"
    }