"use client"

import useSWR from "swr"
import { TaskColumns, TaskFilterSchema } from "../_schema/taskSchema"
import { fetchTasks } from "../_query/taskQuery"
import { SortOrder } from "@/app/(core)/appSchema"

/** タスクリストを取得する */
export const useTasks = ({filter, sortColumn, sortOrder}:{
  filter: TaskFilterSchema, sortColumn: TaskColumns, sortOrder: SortOrder}) => {

  // 検索条件に紐づくタスクリストを取得する
  const { data: tasks, error, mutate, isLoading } = useSWR(
    ["タスクリスト", filter, sortColumn, sortOrder],
    () => fetchTasks({
      filter,
      sortColumn,
      sortOrder
    })
  )

  // エラーをチェックする
  if (error) throw error;

  return {
    fetchedTasks: tasks,
    isLoading,
    refresh :mutate
  }
}
