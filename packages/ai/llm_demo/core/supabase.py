import os
from dotenv import load_dotenv
from supabase import create_client, Client

# 環境変数をロードする
load_dotenv()

supabase: Client = create_client(
    supabase_url=os.environ["SUPABASE_URL"], 
    supabase_key=os.environ["SUPABASE_ANON_KEY"]
)
