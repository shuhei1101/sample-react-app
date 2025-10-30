"use client"

import { useRouter } from "next/navigation"
import { taskApi } from "../_client/taskApi"
import { TaskFormSchema } from "../_schema/taskSchema"
import { feedbackMessage } from "@/app/(shared)/_util/feedbackMessage"

/** 新規作成ボタン押下時のハンドル */
export const useTaskSave = () => {
  const router = useRouter()
  const handleSave = async (task: TaskFormSchema) => {
    // タスクを新規作成する
    const data = await taskApi.create(task)

    // 次画面で表示するメッセージを登録する
    feedbackMessage.set('タスクを登録しました')
    
    // 更新したタスクのページに遷移する
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${data.id}`)
  }
  return { handleSave }
}
