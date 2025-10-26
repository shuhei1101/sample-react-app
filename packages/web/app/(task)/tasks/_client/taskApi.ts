import { TaskFormSchema, TaskId } from "../_schema/taskSchema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const taskApi = {
  /** タスクを作成する */
  create: async (task: TaskFormSchema) => fetch(`${apiUrl}/tasks/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(res => res.json()),
  
  /** タスクを更新する */
  update: (task: TaskFormSchema) => fetch(`${apiUrl}/tasks/${task.id}/api`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  }).then(res => res.json()),
  
  /** タスクを削除する */
  delete: (id: TaskId) => fetch(`${apiUrl}/tasks/${id}/api`, {
    method: "DELETE"}).then(res => res.json()),
}
