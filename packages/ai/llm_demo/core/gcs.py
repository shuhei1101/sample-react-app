# gcs_manager.py
from abc import ABC, abstractmethod
import os
from google.cloud import storage

class StorageHandler(ABC):
    """ストレージハンドラインタフェース"""
    @abstractmethod
    def upload(self, from_: str, to: str):
        pass

    @abstractmethod
    def download(self, from_: str, to: str):
        pass

class MockStorageHandler(StorageHandler):
    """モック用ストレージハンドラ"""
    def upload(self, from_: str, to: str):
        print(f"【{from_}】から【{to}】へアップロードします。")

    def download(self, from_: str, to: str):
        print(f"【{from_}】から【{to}】へダウンロードします。")

class GCSHandler(StorageHandler):
    """GCSのストレージハンドラ"""
    def __init__(self, bucket_name: str):
        self.bucket_name = bucket_name
    
    def upload(self, from_: str, to: str):
        '''GCSにファイルをアップロードする'''
        # バケットを生成する
        bucket = storage.Client().bucket(self.bucket_name)
        # ファイルの存在を確認する
        if not os.path.exists(from_):
            raise ValueError(f"ファイル「{from_}」が存在しません。")
        # ファイルをアップロードする
        blob = bucket.blob(to)
        blob.upload_from_filename(from_)

    def download(self, from_: str, to: str):
        '''GCSからファイルをダウンロード'''
        # バケットを生成する
        bucket = storage.Client().bucket(self.bucket_name)
        # ディレクトリの作成
        os.makedirs(os.path.dirname(to), exist_ok=True)
        # バケットをダウンロードする
        blob = bucket.blob(from_)
        blob.download_to_filename(to)
