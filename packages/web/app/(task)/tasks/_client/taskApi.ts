import { TaskEntity } from "../_data-access/taskEntity";
import { TaskFormSchema } from "../_schema/taskSchema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const taskApi = {
  /** タスクを作成する */
  create: async (task: TaskFormSchema) => {
    const createdTask: TaskEntity = await fetch(`${apiUrl}/tasks/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(res => res.json())
    return createdTask
  },
  
  /** タスクを更新する */
  update: async (task: TaskFormSchema) => {
    await fetch(`${apiUrl}/tasks/api`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(res => res.json())
  },
  
  /** タスクを削除する */
  delete: async (task: TaskFormSchema) => {
    await fetch(`${apiUrl}/tasks/api`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(res => res.json())
  },
}
