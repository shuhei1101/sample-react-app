"use client"
import { clientSupabase } from "@/app/(core)/supabase/clientSupabase";
import { appStorage } from "../../(shared)/_sessionStorage/appStorage";
import { useRouter } from "next/navigation";
import { LOGIN_URL } from "@/app/(core)/appConstants";

/** サインアウト時の処理 */
export const useSignOut = () => {
  const router = useRouter()
  
  const signout = async () => {
    const { error } = await clientSupabase.auth.signOut();

   // ログインしていない場合のハンドル
    if (error) {
      // 次画面で表示するメッセージを登録する
      appStorage.feedbackMessage.set('サインアウト中にエラーが発生しました。')
    } else {
      // 次画面で表示するメッセージを登録する
      appStorage.feedbackMessage.set('サインアウトしました。')
    }
    router.push(`${LOGIN_URL}`)
  }
  return {signout}
}
