from llm_demo.core.supabase import supabase
from llm_demo.task.model.task import Task

def fetch_tasks():
    '''全タスクを取得する'''
    response = (
        supabase.table("tasks")
        .select("*")
        .execute()
    )
    # タスクモデルに変換して返す
    return [Task(**task_dict) for task_dict in response.data] # type: ignore

# 動作確認用
if __name__ == "__main__":
    tasks = fetch_tasks()
    [print(task) for task in tasks]
