import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from llm_demo.core.app_constants import BASE_TASK_ROUTE

# 環境変数を読み込む
load_dotenv()
# FastAPIを初期化する
app = FastAPI()

# CORSを許可する
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js local
        os.environ["PROD_APP_URL"]  # 本番Webアプリ
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# タスク質問ルートを設定する
from llm_demo.task.api.server import router as question_task_router
app.include_router(question_task_router, prefix=f"{BASE_TASK_ROUTE}", tags=["Task"])
