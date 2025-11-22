import os
from dotenv import load_dotenv
from llm_demo.core.document_storage import DocumentStorage
from llm_demo.core.gcs import MockStorageHandler

# 環境変数を読み込む
load_dotenv()

task_dir = os.path.dirname(os.path.dirname(__file__)) # Taskディレクトリ
app_dir = os.path.dirname(task_dir) # appディレクトリ
root_dir = os.path.dirname(app_dir) # ルートディレクトリ
tmp_dir = os.path.join(root_dir, "tmp") # tmpディレクトリ
os.makedirs(tmp_dir, exist_ok=True) # tmpディレクトリを作成（存在しない場合）
local_zip_path = os.path.join(tmp_dir, "task_index.zip") # ローカルのZIP保存パス
local_index_dir = os.path.join(tmp_dir, "task_index") # ローカルのインデックスディレクトリ


# タスクドキュメントストレージのインスタンス
task_doc_storage = DocumentStorage(
    index_zip_name='task_index.zip',
    local_zip_path=local_zip_path,
    local_index_dir=local_index_dir,
    storage_handler=MockStorageHandler()
)
