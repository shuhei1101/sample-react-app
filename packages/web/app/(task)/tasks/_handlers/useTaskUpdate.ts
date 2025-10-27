"use client";

import { taskApi } from "../_client/taskApi";
import { TaskFormSchema } from "../_schema/taskSchema";

export const useTaskUpdate = () => {
  
  const handleUpdate = async (task: TaskFormSchema) => {
      await taskApi.update(task)
  };

  return { handleUpdate };

}
