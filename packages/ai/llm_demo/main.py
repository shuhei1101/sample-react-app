from dotenv import load_dotenv
from fastapi import FastAPI

from llm_demo.core.app_constants import BASE_TASK_ROUTE
from llm_demo.task.service.refresh_task_docs import refresh_task_docs

# 環境変数を読み込む
load_dotenv()
# FastAPIを初期化する
app = FastAPI()

# タスク質問ルートを設定する
from llm_demo.task.api.server import router as question_task_router
app.include_router(question_task_router, prefix=f"{BASE_TASK_ROUTE}/question", tags=["Task"])
