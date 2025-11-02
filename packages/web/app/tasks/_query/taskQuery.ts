import { TaskColumns, TaskFilterSchema } from "../_schema/taskSchema";
import { SortOrder } from "@/app/(core)/appSchema";
import { clientSupabase } from "@/app/(core)/supabase/clientSupabase";

/** 検索条件に一致するタスクを取得する */
export const fetchTasks = async ({
  sortColumn,
  sortOrder,
  filter
}: {
  sortColumn: TaskColumns,
  sortOrder: SortOrder,
  filter: TaskFilterSchema
}) => {
    // データを取得する
    let query = clientSupabase.from("tasks").select('*')

    // フィルター
    if (filter.id !== undefined) query = query.eq("id", filter.id)
    if (filter.name !== undefined) query = query.ilike("name", filter.name)
    if (filter.status_id !== undefined) query = query.eq("status_id", filter.status_id)

    // ソート
    query = query.order(sortColumn, {ascending: sortOrder === "asc"})

    const { data, error } = await query

    if (error) throw error

    return data
}

/** IDに紐づくタスクを取得する */
export const fetchTask = async (id: number) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("tasks")
      .select('*')
      .eq("id", id).single();

    // エラーをチェックする
    if (error) throw error;

    return data
}


/** 全タスクステータスを取得する */
export const fetchTaskStatuses = async () => {
  // データを取得する
  const { data, error } = await clientSupabase.from("task_statuses")
    .select('*')

  // エラーをチェックする
  if (error) throw error;

  return data
}
