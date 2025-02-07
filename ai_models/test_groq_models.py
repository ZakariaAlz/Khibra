import os
import requests
from dotenv import load_dotenv

# Load API Key from .env
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Check if API key is loaded
if not GROQ_API_KEY:
    print("Error: API key not found. Check your .env file!")
    exit()

# ✅ Correct API URL for chat completion
API_URL = "https://api.groq.com/openai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
}

# ✅ Use a working model name (choose one)
MODEL_NAME = "mixtral-8x7b-32768"  # or "llama-3.1-8b-instant"

# Create API request
data = {
    "model": MODEL_NAME,
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello! What can you do?"}
    ]
}

# Send request
response = requests.post(API_URL, headers=headers, json=data)

# Print response
if response.status_code == 200:
    print("✅ API Call Successful!")
    print("Response:", response.json())
else:
    print("❌ API Call Failed!")
    print("Status Code:", response.status_code)
    print("Error:", response.text)
