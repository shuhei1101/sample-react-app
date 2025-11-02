"use client"

import { useRouter } from "next/navigation"
import { handleAppError } from "@/app/(core)/errorHandler"
import { taskApi } from "../_client/taskApi"
import { TaskFormSchema } from "../_schema/taskSchema"
import { appStorage } from "@/app/(shared)/_sessionStorage/appStorage"

/** 削除ボタン押下時のハンドル */
export const useTaskDelete = () => {
  const router = useRouter()
  const handleDelete = async (task: TaskFormSchema) => {
    try {
      // 削除確認を行う
      if (window.confirm('本当に削除しますか？')) {
        // タスクを削除する
        await taskApi.delete(task)

        // 前画面で表示するメッセージを登録する
        appStorage.feedbackMessage.set('タスクを削除しました')
        
        // 前画面に戻る
        router.back()
      }
    } catch (error) {
      handleAppError(error, router)
    }
  }

  return { handleDelete }
}
