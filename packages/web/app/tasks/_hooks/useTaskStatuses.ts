"use client"

import { useEffect, useState } from "react"
import { createTaskStatusesFromEntities, TaskStatusSchema } from "../_schema/taskStatusSchema"
import useSWR from "swr"
import { fetchTaskStatuses } from "../_query/taskQuery"
import { AppError } from "@/app/(core)/appError"

/** タスクステータスを取得する */
export const useTaskStatuses = () => {

  // IDに紐づくステータスを取得する
  const { data: taskStatusEntities, error, mutate, isLoading } = useSWR(
    "ステータス",
    () => fetchTaskStatuses()
  )

  // エラーをチェックする
  if (error) throw error

  const [fetchedTaskStatuses, setFetchedTaskStatuses] = useState<TaskStatusSchema[]>([])

  // ステータスを取得できた場合、状態にセットする
  useEffect(() => {
    if (taskStatusEntities) {
      setFetchedTaskStatuses(createTaskStatusesFromEntities(taskStatusEntities))
    }
  }, [taskStatusEntities])

  return {
    fetchedTaskStatuses,
    isLoading,
    refresh :mutate
  }
}
