from datetime import datetime

from pydantic import BaseModel
from llama_index.core import Document

class Task(BaseModel):
    '''タスクモデル'''
    id: int # ID
    name: str # タスク名
    detail: str # タスク詳細
    status_id: int # ステータスID
    send_mail: bool # メール送信フラグ
    created_at: datetime # 作成日時
    updated_at: datetime # 更新日時


def tasks_to_documents(tasks: list[Task]):
    '''タスクモデルをLlamaドキュメントに変換する'''
    documents: list[Document] = []

    for task in tasks:
        documents.append(Document(
            text=f"タスク名: {task.name}, 詳細: {task.detail}",
            metadata={
                "id": task.id,
                "name": task.name,
                "status_id": task.status_id,
                "send_mail": task.send_mail,
                "created_at": task.created_at.strftime("%Y/%m/%d"),
                "updated_at": task.updated_at.strftime("%Y/%m/%d"),
            }
        ))

    return documents
