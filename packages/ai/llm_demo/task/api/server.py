from fastapi import APIRouter
from pydantic import BaseModel
from llm_demo.task.service.question_task import question_task_service

# APIルータの定義
router = APIRouter()

class QuestionTaskResponse(BaseModel):
    """question_taskのレスポンス"""
    answer: str

@router.post("/", response_model=QuestionTaskResponse)
async def question_task(prompt: str):
    """タスクについて質問する"""
    response = question_task_service.excute(prompt=prompt)
    return QuestionTaskResponse(
        answer=response.answer
    )
