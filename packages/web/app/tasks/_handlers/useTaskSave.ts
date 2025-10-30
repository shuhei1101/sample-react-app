"use client"

import { useRouter } from "next/navigation"
import { taskApi } from "../_client/taskApi"
import { TaskFormSchema } from "../_schema/taskSchema"
import { appStorage } from "@/app/(shared)/_sessionStorage/appStorage"
import { handleAppError } from "@/app/(core)/errorHandler"

/** 新規作成ボタン押下時のハンドル */
export const useTaskSave = () => {
  const router = useRouter()
  const handleSave = async (task: TaskFormSchema) => {
    try {
      // タスクを新規作成する
      const id = await taskApi.create(task)
  
      // 次画面で表示するメッセージを登録する
      appStorage.feedbackMessage.set('タスクを登録しました')
      
      // 更新したタスクのページに遷移する
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`)
      
    } catch (err) {
      handleAppError(err, router)
    }
  }
  return { handleSave }
}
