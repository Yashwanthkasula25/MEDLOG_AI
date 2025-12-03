# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router
from .database import engine
from . import models

app = FastAPI(title="MedLog AI")
models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")
