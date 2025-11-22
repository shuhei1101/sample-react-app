from llm_demo.task.model.task import tasks_to_documents
from llm_demo.task.query.task_query import fetch_tasks
from llm_demo.task.cloud_storage.task_doc_storage import task_doc_storage

def refresh_task_docs():
    '''DBからタスクを読み込み、Cloud Storageに格納する'''
    
    tasks = fetch_tasks() # タスクを読み込む
    docs = tasks_to_documents(tasks) # タスクをドキュメントに変換する
    task_doc_storage.save_docs(docs) # ドキュメントをCloud Storageに保存する
    