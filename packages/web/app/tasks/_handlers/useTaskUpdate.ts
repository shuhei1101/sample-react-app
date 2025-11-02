"use client"

import { useRouter } from "next/navigation"
import { taskApi } from "../_client/taskApi"
import { TaskFormSchema } from "../_schema/taskSchema"
import { handleAppError } from "@/app/(core)/errorHandler"
import { appStorage } from "@/app/(shared)/_sessionStorage/appStorage"

/** 更新ボタン押下時のハンドル */
export const useTaskUpdate = () => {
  const router = useRouter()
  const handleUpdate = async (task: TaskFormSchema) => {
    try {
      console.log(`タスクを更新: ${task.id}`)
      // タスクを更新する
      await taskApi.update(task)
      
      // 次画面で表示するメッセージを登録する
      appStorage.feedbackMessage.set('タスクを更新しました')

      // 前画面に戻る
      router.back()
    } catch (error) {
      handleAppError(error, router)
    }
  }

  return { handleUpdate }
}
