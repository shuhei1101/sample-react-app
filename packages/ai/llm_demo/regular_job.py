from llm_demo.task.service.refresh_task_docs import refresh_task_docs

def main():
    """定期実行する処理"""
    # タスクドキュメントを最新にリフレッシュする
    refresh_task_docs()
    print("タスクドキュメントを最新化しました。")

if __name__ == "__main__":
    main()
