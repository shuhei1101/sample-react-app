import { DatabaseError } from "@/app/(core)/appError"
import { serverSupabase } from "@/app/(core)/supabase/serverSupabase"
import { ProfileDelete, ProfileInsert, ProfileUpdate } from "../../_schema/profileSchema"
import { profileExclusiveControl } from "./profileExclusiveControl"

export const profileDao = {
  /** プロフィールを挿入する */
  insert: async (record: ProfileInsert) => {
    // レコードを挿入する
    const { data, error } = await serverSupabase.from("profiles")
    .insert([record])
    .select("user_id")
    .single()
    
    // エラーをチェックする
    if (error) {
      console.log(`プロフィールの作成に失敗しました。: ${error}`)
      throw new DatabaseError('プロフィールの作成に失敗しました。')
    }
    // 作成されたIDを返却する
    return data.user_id
  },

  /** プロフィールを更新する */
  update: async (record: ProfileUpdate) => {
    // 存在をチェックする
    const beforeProfile = await profileExclusiveControl.existsCheck(record.user_id)
    
    // 更新日時による排他制御を行う
    profileExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeProfile.updated_at, 
      afterDate: record.updated_at
    })
    
    // プロフィールを更新する
    const {error} = await serverSupabase.from("profiles")
    .update(record)
    .eq("user_id", record.user_id)

    // エラーをチェックする
    if (error) {
      console.log(`プロフィールの更新に失敗しました。: ${error}`)
      throw new DatabaseError(`更新時にエラーが発生しました。: ${error}`)
    }
  },

  /** プロフィールを削除する */
  delete: async (record: ProfileDelete) => {
    // 存在をチェックする
    const beforeProfile = await profileExclusiveControl.existsCheck(record.user_id)
    
    // 更新日時による排他制御を行う
    profileExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeProfile.updated_at, 
      afterDate: record.updated_at
    })
    
    const { error } = await serverSupabase.from("profiles")
      .delete()
      .eq("user_id", record.user_id)

    // エラーをチェックする
    if (error) {
      console.log(`プロフィールの削除に失敗しました。: ${error}`)
      throw new DatabaseError(`プロフィールの削除に失敗しました。`)
    }
  }
}
