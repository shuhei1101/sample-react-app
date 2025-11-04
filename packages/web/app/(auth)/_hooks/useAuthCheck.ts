"use client"
import { clientSupabase } from "@/app/(core)/supabase/clientSupabase";
import { appStorage } from "../../(shared)/_sessionStorage/appStorage";
import { useRouter } from "next/navigation";
import { LOGIN_URL } from "@/app/(core)/appConstants";
import { fetchProfile } from "../_query/profileQuery";

export const useAuthCheck = () => {
  const router = useRouter()
  
  const checkAuth = async () => {
    const { data } = await clientSupabase.auth.getSession();

    // ログインに失敗した場合
    if (!data.session) {
      // 次画面で表示するメッセージを登録する
      appStorage.feedbackMessage.set('セッションが切れました。再度ログインしてください。')
        
      // ログイン画面に戻る
      router.push(`${LOGIN_URL}`)
      return {}
    }

    // ユーザ情報を取得する
    const userInfo = await fetchProfile(data.session.user.id)

    // ユーザ情報を返却する
    return {
      userInfo,
      userId: data.session.user.id,
    }
  }
  return {checkAuth}
}
