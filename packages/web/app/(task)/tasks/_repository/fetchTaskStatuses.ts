import { supabase } from "@/app/(shared)/supabase"

/** タスクステータスをすべて取得する */
export const fetchTaskStatuses = async () => {
  // データを取得する
  const { data, error } = await supabase.from("task_statuses")
    .select('*')

  // エラーをチェックする
  if (error) throw error;

  return data ?? [];
}
