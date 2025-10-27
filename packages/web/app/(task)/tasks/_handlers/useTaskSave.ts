"use client";

import { useRouter } from "next/navigation";
import { taskApi } from "../_client/taskApi";
import { TaskFormSchema } from "../_schema/taskSchema";

export const useTaskSave = () => {
  const router = useRouter();
  
  const handleSave = async (task: TaskFormSchema) => {
    
    // タスクを新規作成する
    const data = await taskApi.create(task);
  
    // 更新したタスクのページに遷移する
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${data.id}`);
  };

  return { handleSave };

}
