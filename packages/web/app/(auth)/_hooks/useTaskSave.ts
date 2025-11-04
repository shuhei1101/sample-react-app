"use client"

import { useRouter } from "next/navigation"
import { handleAppError } from "@/app/(core)/errorHandler"
import { ProfileFormSchema } from "../_schema/profileSchema"
import { profileApi } from "../_client/profileApi"
import toast from "react-hot-toast"

/** 新規作成ボタン押下時のハンドル */
export const useProfileSave = ({close}: {
  close: () => void
}) => {
  const router = useRouter()
  const handleSave = async (profile: ProfileFormSchema) => {
    try {
      // プロフィールを新規作成する
      const id = await profileApi.create(profile)
      console.log(`登録したプロフィールID: ${id}`)
  
      // 成功メッセージを表示する
      toast('ユーザ情報を更新しました。')

      // ポップアップを閉じる
      close()
        
    } catch (err) {
      handleAppError(err, router)
    }
  }
  return { handleSave }
}
