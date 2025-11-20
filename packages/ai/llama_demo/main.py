from dotenv import load_dotenv
from fastapi import FastAPI

from llama_demo.core.app_constants import BASE_TASK_ROUTE
from llama_demo.task.api.question_task import router as question_task_router

# 環境変数を読み込む
load_dotenv()
# FastAPIのインスタンス
app = FastAPI()

# タスク質問ルートを設定する
app.include_router(question_task_router, prefix=f"{BASE_TASK_ROUTE}/question", tags=["Task"])
