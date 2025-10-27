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
  },
  
  /** タスクを更新する */
  update: (task: TaskFormSchema) => fetch(`${apiUrl}/tasks/${task.id}/api`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  }).then(res => res.json()),
  
  /** タスクを削除する */
  delete: (task: TaskFormSchema) => fetch(`${apiUrl}/tasks/${task.id}/api`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  }).then(res => res.json()),
}
