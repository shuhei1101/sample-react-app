import { DatabaseError } from "@/app/(core)/appError";
import { projectExclusiveControl } from "./projectExclusiveControl";
import { ProjectDelete, ProjectInsert, ProjectUpdate } from "../_schema/projectSchema";
import { serverSupabase } from "@/app/(core)/supabase/serverSupabase";

export const projectDao = {
  /** プロジェクトを挿入する */
  insert: async (record: ProjectInsert) => {
    // レコードを挿入する
    const { data, error } = await serverSupabase.from("projects")
    .insert([record])
    .select("id")
    .single();
    
    // エラーをチェックする
    if (error) {
      console.log(`プロジェクトの作成に失敗しました。: ${error}`)
      throw new DatabaseError('プロジェクトの作成に失敗しました。')
    };
    // 作成されたIDを返却する
    return data.id
  },

  /** プロジェクトを更新する */
  update: async (record: ProjectUpdate) => {
    // 存在をチェックする
    const beforeProject = await projectExclusiveControl.existsCheck(record.id)
    
    // 更新日時による排他制御を行う
    projectExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeProject.updated_at, 
      afterDate: record.updated_at
    })
    
    // プロジェクトを更新する
    const {error} = await serverSupabase.from("projects")
    .update(record)
    .eq("id", record.id);

    // エラーをチェックする
    if (error) {
      console.log(`プロジェクトの更新に失敗しました。: ${error}`)
      throw new DatabaseError(`更新時にエラーが発生しました。: ${error}`)
    };
  },

  /** プロジェクトを削除する */
  delete: async (record: ProjectDelete) => {
    // 存在をチェックする
    const beforeProject = await projectExclusiveControl.existsCheck(record.id)
    
    // 更新日時による排他制御を行う
    projectExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeProject.updated_at, 
      afterDate: record.updated_at
    })
    
    const { error } = await serverSupabase.from("projects")
      .delete()
      .eq("id", record.id);

    // エラーをチェックする
    if (error) {
      console.log(`プロジェクトの削除に失敗しました。: ${error}`)
      throw new DatabaseError(`プロジェクトの削除に失敗しました。`);
    };
  }
}
