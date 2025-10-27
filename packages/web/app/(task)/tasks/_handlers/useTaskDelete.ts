"use client";

import { taskApi } from "../_client/taskApi";
import { TaskFormSchema } from "../_schema/taskSchema";

export const useTaskDelete = () => {
  
  const handleDelete = async (task: TaskFormSchema) => {
    if (window.confirm('本当に削除しますか？')) {
      console.log('削除処理');
      taskApi.delete(task)
    }
  };

  return { handleDelete }
}
