import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Print the API key (for testing)
print(f"API Key: {GROQ_API_KEY}")
