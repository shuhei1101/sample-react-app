import { supabase } from "@/app/(core)/supabase";
import { DatabaseError } from "@/app/(core)/appError";
import { taskExclusiveControl } from "./taskExclusiveControl";
import { TaskDelete, TaskInsert, TaskUpdate } from "./taskEntity";

export const taskDao = {
  
  /** タスクを挿入する */
  insert: async (record: TaskInsert) => {
    const { data, error } = await supabase.from("tasks")
    .insert([record])
    .select("id")
    .single();
    
    // エラーをチェックする
    if (error) throw error;
    
    // 更新されたIDを返却する
    return data.id;
  },

  /** タスクを更新する */
  update: async (record: TaskUpdate) => {
    
    // 存在をチェックする
    const beforeTask = await taskExclusiveControl.existsCheck(record.id)

    // 更新日時による排他制御を行う
    taskExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeTask.updated_at, 
      afterDate: record.updated_at
    })

    // タスクを更新する
    const {error} = await supabase.from("tasks")
    .update(record)
    .eq("id", record.id);
    
    // エラーをチェックする
    if (error) throw new DatabaseError(`更新時にエラーが発生しました。: ${error}`);

  },

  /** タスクを削除する */
  delete: async (record: TaskDelete) => {

    // 存在をチェックする
    const beforeTask = await taskExclusiveControl.existsCheck(record.id)

    // 更新日時による排他制御を行う
    taskExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeTask.updated_at, 
      afterDate: record.updated_at
    })

    // タスクを削除する
    const { error } = await supabase.from("tasks")
      .delete()
      .eq("id", record.id);
    
    // エラーをチェックする
    if (error) throw error;
  }
}
