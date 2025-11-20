
from fastapi import APIRouter
from pydantic import BaseModel

# APIルータの定義
router = APIRouter()

# レスポンス
class QuestionTaskResponse(BaseModel):
    message: str


@router.post("/question", response_model=QuestionTaskResponse)
async def question_task(prompt: str):
    """タスクについて質問する"""
    pass
