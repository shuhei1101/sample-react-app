import { handleAPIError } from "@/app/(core)/errorHandler";
import { ProfileFormSchema } from "../_schema/profileSchema";
import { PROFILE_API_URL } from "@/app/(core)/appConstants";
import { RegisterProfileResponse } from "../user/api/route";

export const profileApi = {
  /** ユーザを作成する */
  create: async (profile: ProfileFormSchema) => {
    const res = await fetch(`${PROFILE_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
    const data: RegisterProfileResponse = await res.json()

    return data.id
  },
  
  /** ユーザを更新する */
  update: async (profile: ProfileFormSchema) => {
    const res = await fetch(`${PROFILE_API_URL}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
  
  /** ユーザを削除する */
  delete: async (profile: ProfileFormSchema) => {
    const res = await fetch(`${PROFILE_API_URL}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    })

    // ステータスが不正な場合、アプリ例外を発生させる
    if (!res.ok) {
      await handleAPIError(res)
    }
  },
}
