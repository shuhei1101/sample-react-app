from llm_demo.task.cloud_storage.task_doc_storage import task_doc_storage
from llama_index.llms.openai import OpenAI

# タスクインデックス
task_index = task_doc_storage.load_index()
# インデックスが存在しない場合、処理を終了する
if task_index == None:
    raise Exception("タスクインデックスが存在しませんでした。")
# タスククエリエンジン
task_query_engine = task_index.as_query_engine(
    llm=OpenAI(
    model="gpt-4o-mini",
    temperature=0.7,
    system_prompt="""
    あなたは明るく元気なアシスタントです。
    質問にはわかりやすく、日常会話風に柔らかい表現を交えて答えてください。
    すべて日本語で話してください。
    """),
    similarity_top_k=None
)
# 現在登録中のドキュメント数
print(len(task_index.docstore.docs))
