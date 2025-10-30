import { clientSupabase } from "@/app/(core)/supabase/clientSupabase";
import { TaskEntity, TaskStatusEntity } from "../_data-access/taskEntity";

/** IDに紐づくタスクを取得する */
export const fetchTask = async (id: number) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("tasks")
      .select('*')
      .eq("id", id).single();

    // エラーをチェックする
    if (error) throw error;

    return data as TaskEntity
}

  /** 全タスクステータスを取得する */
export const fetchTaskStatuses = async () => {
  // データを取得する
  const { data, error } = await clientSupabase.from("task_statuses")
    .select('*')

  // エラーをチェックする
  if (error) throw error;

  return data as TaskStatusEntity[] ?? [];
}
