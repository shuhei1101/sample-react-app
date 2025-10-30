"use client"

import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { taskApi } from "../_client/taskApi"
import { TaskFormSchema } from "../_schema/taskSchema"
import { handleAppError } from "@/app/(core)/errorHandler"

/** 更新ボタン押下時のハンドル */
export const useTaskUpdate = () => {
  const router = useRouter()
  const handleUpdate = async (task: TaskFormSchema) => {
    try {
      // タスクを更新する
      await taskApi.update(task)
      
      // 更新時のメッセージを表示する
      toast('タスクの更新に完了しました。')
    } catch (error) {
      handleAppError(error, router)
    }
  }

  return { handleUpdate }
}
