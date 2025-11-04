import { DatabaseError } from "@/app/(core)/appError"
import { ProjectMemberDelete, ProjectMemberInsert } from "../_schema/projectMemberSchema"
import { serverSupabase } from "@/app/(core)/supabase/serverSupabase"

export const projectMemberDao = {
  /** プロジェクトメンバーを挿入する */
  insert: async (record: ProjectMemberInsert) => {
    // レコードを挿入する
    const { data, error } = await serverSupabase.from("projectMembers")
    .insert([record])
    .select("id")
    .single()
    
    // エラーをチェックする
    if (error) {
      console.log(`プロジェクトメンバーの作成に失敗しました。: ${error}`)
      throw new DatabaseError('プロジェクトメンバーの作成に失敗しました。')
    }
    // 作成されたIDを返却する
    return data.id
  },

  /** 複数のプロジェクトメンバーを一括挿入する */
  bulkInsert: async (records: ProjectMemberInsert[]) => {
    // レコードを挿入する
    const { error } = await serverSupabase.from("projectMembers")
    .insert(records)
    
    // エラーをチェックする
    if (error) {
      console.log(`プロジェクトメンバーの登録に失敗しました。: ${error}`)
      throw new DatabaseError('プロジェクトメンバーの登録に失敗しました。')
    }
    return
  },

  /** プロジェクトメンバーを削除する */
  delete: async (record: ProjectMemberDelete) => {
    const { error } = await serverSupabase.from("projectMembers")
      .delete()
      .eq("project_id", record.project_id)
      .eq("user_id", record.user_id)

    // エラーをチェックする
    if (error) {
      console.log(`プロジェクトメンバーの削除に失敗しました。: ${error}`)
      throw new DatabaseError(`プロジェクトメンバーの削除に失敗しました。`)
    }
  },

  /** プロジェクトIDに一致するメンバーを一括削除する */
  deleteByProjectId: async (project_id: number) => {
    const { error } = await serverSupabase.from("projectMembers")
      .delete()
      .eq("project_id", project_id)

    // エラーをチェックする
    if (error) {
      console.log(`プロジェクトメンバーの削除に失敗しました。: ${error}`)
      throw new DatabaseError(`プロジェクトメンバーの削除に失敗しました。`)
    }
  },
}
