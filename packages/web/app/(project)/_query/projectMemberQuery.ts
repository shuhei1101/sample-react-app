import { RawProfile } from "@/app/(auth)/_schema/profileSchema";
import { clientSupabase } from "@/app/(core)/supabase/clientSupabase";

/** プロジェクトIDに紐づくプロジェクトメンバーIDを取得する */
export const fetchProjectMemberIds = async (project_id: number) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("project_members")
      .select('user_id')
      .eq("project_id", project_id);

    // エラーをチェックする
    if (error) throw error;

    return data as {user_id: string}[] ?? []
}


/** プロジェクトIDに紐づくプロジェクトメンバーを取得する */
export const fetchProjectMembers = async (project_id: number) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("project_members")
      .select(`profiles (*)`)
      .eq("project_id", project_id);

    // エラーをチェックする
    if (error) throw error;

    console.log(`取得プロジェクトメンバー: ${JSON.stringify(data)}`)

    const members = data?.flatMap(e => e.profiles) as RawProfile[] ?? []

    return members
}
