"use client"

import { useRouter } from "next/navigation"
import { taskApi } from "../../../_api-client/taskApi"
import { handleAppError } from "@/app/(core)/errorHandler"
import { UIError } from "@/app/(core)/appError"

/** 送信ボタン押下時のハンドル */
export const useSendMessage = () => {
  const router = useRouter()
  const handleSend = async (prompt: string) => {
    try {
      // メッセージを送信する
      const data = await taskApi.question({prompt})
      if (data == undefined) throw new UIError("メッセージの生成に失敗しました。")
      return data
    } catch (error) {
      handleAppError(error, router)
    }
  }

  return { handleSend }
}
