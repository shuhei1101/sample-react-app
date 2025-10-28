"use client";

import { taskApi } from "../_client/taskApi";
import { TaskFormSchema } from "../_schema/taskSchema";

/** 削除ボタン押下時のハンドル */
export const useTaskDelete = () => {
  const handleDelete = async (task: TaskFormSchema) => {
    // 削除確認を行う
    if (window.confirm('本当に削除しますか？')) {
      // タスクを削除する
      await taskApi.delete(task)
    }
  };
  return { handleDelete }
}
