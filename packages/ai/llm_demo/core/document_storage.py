
import os
import shutil
import zipfile
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex
from llama_index.llms.openai import OpenAI
from llama_index.core import Document, StorageContext, load_index_from_storage
from llm_demo.core.gcs import StorageHandler

load_dotenv()

BUCKET_NAME = os.environ["BUCKET_NAME"] # GCSバケット名

class DocumentStorage:
    '''DocumentStorage'''
    def __init__(self, index_zip_name, local_zip_path, local_index_dir, storage_handler: StorageHandler) -> None:
        self.index_zip_name = index_zip_name # ZIPファイル名
        self.local_zip_path = local_zip_path # ローカルのZIP配置パス
        self.local_index_dir = local_index_dir # ローカルのindex配置パス
        self.storage_handler = storage_handler # ストレージハンドラ

    def save_docs(self, docs: list[Document]):
        '''LlamaドキュメントをCloud Storageに格納する'''
        # llmのインスタンスを生成する
        llm = OpenAI(model="gpt-4o-mini", temperature=0)
        # indexを作成する
        index = VectorStoreIndex.from_documents(docs, llm=llm)
        # 一時保存ディレクトリを初期化する
        if os.path.exists(self.local_index_dir):
            shutil.rmtree(self.local_index_dir)
        # indexをローカルストレージに一時保存する
        index.storage_context.persist(persist_dir=self.local_index_dir)
        # ZIPファイルが存在する場合、削除する
        if os.path.exists(self.local_zip_path):
            os.remove(self.local_zip_path)
        # 一時保存フォルダをzip化する
        with zipfile.ZipFile(self.local_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(self.local_index_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    relative = os.path.relpath(full_path, self.local_index_dir)
                    zipf.write(full_path, arcname=relative)
        # Cloud Storageにアップロードする
        self.storage_handler.upload(from_=self.local_zip_path, to=self.index_zip_name)

    def load_index(self):
        '''Cloud StorageからLlamaドキュメントを読み込む'''
        # gcsからZIPファイルをダウンロードする
        self.storage_handler.download(from_=self.index_zip_name, to=self.local_zip_path)
        if not os.path.exists(self.local_zip_path):
            return None
        # ZIPファイルを解答する
        with zipfile.ZipFile(self.local_zip_path, "r") as z:
            z.extractall(self.local_index_dir)
        # Indexを読み込む
        storage_context = StorageContext.from_defaults(persist_dir=self.local_index_dir)
        index = load_index_from_storage(storage_context)
        return index
