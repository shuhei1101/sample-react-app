"use client"

import { useRouter } from "next/navigation"
import { taskApi } from "../_client/taskApi"
import { TaskFormSchema } from "../_schema/taskSchema"
import toast from "react-hot-toast"

/** 新規作成ボタン押下時のハンドル */
export const useTaskSave = () => {
  const router = useRouter()
  const handleSave = async (task: TaskFormSchema) => {
    // タスクを新規作成する
    const data = await taskApi.create(task)

    // 保存時のメッセージを表示する
    toast('タスクの保存に完了しました。')
  
    // 更新したタスクのページに遷移する
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${data.id}`)
  }
  return { handleSave }
}
