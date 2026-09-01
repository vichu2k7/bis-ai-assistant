from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.rag_service import ask_bis


# --------------------------------
# Create FastAPI application
# --------------------------------

app = FastAPI(
    title="BIS Sahayak AI",
    description="AI assistant for Bureau of Indian Standards documents",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------------------
# Request model
# --------------------------------

class QuestionRequest(BaseModel):
    question: str


# --------------------------------
# Home endpoint
# --------------------------------

@app.get("/")
def home():
    return {
        "message": "BIS Sahayak AI Backend is running!"
    }


# --------------------------------
# Ask BIS endpoint
# --------------------------------

@app.post("/ask")
def ask_question(request: QuestionRequest):

    result = ask_bis(request.question)

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"]
    }