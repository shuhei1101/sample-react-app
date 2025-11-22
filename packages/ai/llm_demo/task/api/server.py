from fastapi import APIRouter
from pydantic import BaseModel
from llm_demo.task.service.question_task import question_task_service

# APIルータの定義
router = APIRouter()

# リクエストモデル
class QuestionTaskRequest(BaseModel):
    prompt: str

# レスポンスモデル
class QuestionTaskResponse(BaseModel):
    """question_taskのレスポンス"""
    answer: str

@router.post("/", response_model=QuestionTaskResponse)
async def question_task(request: QuestionTaskRequest):
    """タスクについて質問する"""
    response = question_task_service.excute(prompt=request.prompt)
    return QuestionTaskResponse(
        answer=response.answer
    )
