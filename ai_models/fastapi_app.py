import os
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = FastAPI()

# ✅ Define request model
class ProjectEvaluationRequest(BaseModel):
    project_description: str
    submission: str

# ✅ Function to call Flask Model 1 for task difficulty
def get_difficulty_score(task_description):
    flask_url = "http://127.0.0.1:5000/classify"
    response = requests.post(flask_url, json={"task_description": task_description})
    
    if response.status_code == 200:
        return float(response.json()["difficulty"])
    else:
        raise HTTPException(status_code=500, detail="Error getting difficulty score from Flask API")

# ✅ Function to evaluate project submission using Groq AI
def evaluate_project(description, submission):
    api_url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "mixtral-8x7b-32768",  # Use an available Groq model
        "messages": [
            {"role": "system", "content": "Evaluate project submissions on clarity, completeness, and correctness. Give a score between 1-10."},
            {"role": "user", "content": f"Evaluate this submission for the project: {description}. Student's work: {submission}."}
        ]
    }

    response = requests.post(api_url, json=data, headers=headers)

    if response.status_code == 200:
        return float(response.json()["choices"][0]["message"]["content"].strip())  # AI-generated score
    else:
        return 5.0  # Default score if AI call fails

# ✅ FastAPI route to evaluate project
@app.post("/evaluate")
async def evaluate_project_score(request: ProjectEvaluationRequest):
    if not request.project_description or not request.submission:
        raise HTTPException(status_code=400, detail="Invalid input")

    # 🔹 Call Flask Model 1
    difficulty_score = get_difficulty_score(request.project_description)

    # 🔹 Evaluate project submission
    evaluation_score = evaluate_project(request.project_description, request.submission)

    # 🔹 Compute final score
    final_score = difficulty_score * evaluation_score

    return {
        "difficulty_score": difficulty_score,
        "evaluation_score": evaluation_score,
        "final_score": final_score
    }
