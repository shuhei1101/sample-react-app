from typing import List
from pydantic import BaseModel
from llm_demo.core.model.source import Source
from llm_demo.task.llm.task_index import task_query_engine

class QuestionTaskResponse(BaseModel):
    '''question_taskの戻り値'''
    answer: str
    sources: List[Source]

class QuestionTaskService:
    def excute(self, prompt: str) -> QuestionTaskResponse:
        '''タスクを質問する'''
        # llmに質問を行い、レスポンスを受け取る
        response = task_query_engine.query(prompt)
        # レスポンスからソースを取得する
        sources = [Source(
            text=src.text[:200],
            metadata=src.metadata
        ) for src in response.source_nodes]
        # 結果を返却する
        return QuestionTaskResponse(
            answer=str(response),
            sources=sources
        )

question_task_service = QuestionTaskService()
