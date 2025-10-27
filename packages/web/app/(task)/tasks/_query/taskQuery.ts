import { supabase } from "@/app/(core)/supabase";
import { TaskEntity, TaskStatusEntity } from "../_data-access/taskEntity";

export const taskQuery = {
  /** 引数のIDに一致するタスクを取得する */
  fetchTask: async (id: number) => {

    // データを取得する
    const { data, error } = await supabase.from("tasks")
      .select('*')
      .eq("id", id).single();
  
    // エラーをチェックする
    if (error) throw error;

    // 型をキャストする
    const task = data as TaskEntity
  
    return task
  },

  /** タスクステータスを取得する */
  fetchTaskStatuses: async () => {

    // データを取得する
    const { data, error } = await supabase.from("task_statuses")
      .select('*')

    // エラーをチェックする
    if (error) throw error;

    // 型をキャストする
    const taskStatuses = data as TaskStatusEntity[]

    return taskStatuses ?? [];
  }
}
