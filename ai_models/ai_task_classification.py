import os
import requests
from dotenv import load_dotenv

# ✅ Load API Key from .env file (DO NOT OVERWRITE IT LATER)
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# ✅ Check if API key is loaded correctly
if not GROQ_API_KEY:
    raise ValueError("Error: API key not found. Make sure .env file is set up correctly.")

# ✅ Function to classify tasks using Groq API
def classify_task(task_description):
    API_URL = "https://api.groq.com/openai/v1/chat/completions"  # ✅ Corrected URL
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    # ✅ Use a working model (mixtral-8x7b-32768)
    data = {
        "model": "mixtral-8x7b-32768",
        "messages": [
            {"role": "system", "content": "You classify tasks into 'Easy', 'Medium', or 'Hard' based on complexity."},
            {"role": "user", "content": f"Classify this task: {task_description}. Return only 'Easy', 'Medium', or 'Hard'."}
        ]
    }

    response = requests.post(API_URL, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        return result["choices"][0]["message"]["content"].strip()  # ✅ Clean response
    else:
        return f"Error: {response.status_code} - {response.text}"

# ✅ Example test
if __name__ == "__main__":
    task = "Develop a full-stack e-commerce website with authentication."
    difficulty = classify_task(task)
    print(f"Task: {task}\nDifficulty: {difficulty}")
