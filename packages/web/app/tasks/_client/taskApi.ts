import { handleAPIError } from "@/app/(core)/errorHandler";
import { TaskFormSchema } from "../_schema/taskSchema";
import { RegisterTaskResponse } from "../api/route";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const taskApi = {
  /** タスクを作成する */
  create: async (task: TaskFormSchema) => {
    const res = await fetch(`${apiUrl}/tasks/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
    const data: RegisterTaskResponse = await res.json()

    return data.id
  },
  
  /** タスクを更新する */
  update: async (task: TaskFormSchema) => {
    const res = await fetch(`${apiUrl}/tasks/api`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
  
  /** タスクを削除する */
  delete: async (task: TaskFormSchema) => {
    const res = await fetch(`${apiUrl}/tasks/api`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
}
