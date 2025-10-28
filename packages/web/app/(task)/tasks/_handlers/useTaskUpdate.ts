"use client";

import toast from "react-hot-toast";
import { taskApi } from "../_client/taskApi";
import { TaskFormSchema } from "../_schema/taskSchema";

/** 更新ボタン押下時のハンドル */
export const useTaskUpdate = () => {
  const handleUpdate = async (task: TaskFormSchema) => {
    // タスクを更新する
    await taskApi.update(task)
    
    // 更新時のメッセージを表示する
    toast('タスクの更新に完了しました。');
  };
  return { handleUpdate };
}
