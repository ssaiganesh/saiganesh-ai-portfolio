# saiganesh-ai-portfolio/backend/test_env.py
import os
from dotenv import load_dotenv

# Instruct Python to read your local .env configuration variables
load_dotenv()

print("=== OpenAI Backend Environment Diagnostics ===")
print(f"Supabase URL Parsed Successfully: {bool(os.getenv('SUPABASE_URL'))}")
print(f"Supabase Secret Key Accessible:   {bool(os.getenv('SUPABASE_SERVICE_KEY'))}")
print(f"OpenAI API Key Accessible:       {bool(os.getenv('OPENAI_API_KEY'))}")