"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { createTaskFilterFromQueryObj, TaskColumns, TaskFilterSchema } from "./_schema/taskSchema"
import { useTaskStatuses } from "./_hooks/useTaskStatuses"
import { DataTableSortStatus } from "mantine-datatable"
import { useEffect, useState } from "react"
import { useTasks } from "./_hooks/useTasks"
import { tasks } from "../generated/prisma/client"
import { TaskFilter } from "./_components/TaskFilter"
import { TaskTable } from "./_components/TaskTable"
import { TASKS_URL } from "../(core)/appConstants"
import { PageLayout } from "../(shared)/_components/PageLayout"
import { Button } from "@mantine/core"

export default function Page() {
  const router = useRouter();

  /** タスクフィルター状態 */
  const [taskFilter, setTaskFilter] = useState<TaskFilterSchema>({})
  
  /** 検索実行用フィルター状態 */
  const [searchFilter, setSearchFilter] = useState<TaskFilterSchema>({})
  
  /** クエリストリングの状態 */
  const searchParams = useSearchParams();
  
  // パラメータをタスクフィルターにセットする
  useEffect(() => {
    const queryObj: TaskFilterSchema = searchParams ? Object.fromEntries(searchParams.entries()): {}
    setTaskFilter(createTaskFilterFromQueryObj(queryObj))
  }, [searchParams])

  // タスクステータスマスタを取得する
  const { fetchedStatuses, isLoading: statusLoading } = useTaskStatuses()
  
  /** ソート状態 */
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<tasks>>({
    columnAccessor: 'id' as TaskColumns,
    direction: 'asc',
  })
  
  // タスク一覧を取得する
  const { fetchedTasks, isLoading, refresh } = useTasks({
    filter: searchFilter,
    sortColumn: sortStatus.columnAccessor as TaskColumns,
    sortOrder: sortStatus.direction
  })

  /** 検索ボタン押下時のハンドル */
  const handleSerch = () => {
    // タスクフィルターをクエリストリングに変換する
    const paramsObj = Object.fromEntries(
      Object.entries(taskFilter).map(([k, v]) => [k, String(v)])
    )
    const params = new URLSearchParams(paramsObj)

    // フィルターをURLに反映する
    router.push(`${TASKS_URL}?${params.toString()}`)

    // 検索フィルターを更新し、一覧を更新する
    setSearchFilter(taskFilter)

    console.log(`status_id: ${taskFilter.status_id}`)
  }

  return (
    <PageLayout title="タスク一覧" actionButtons={(
      <Button onClick={() => {
        router.push("/tasks/new")
      }}>新規作成</Button>
    )}>
      {/* 検索条件欄 */}
      <TaskFilter statuses={fetchedStatuses} filter={taskFilter} handleSearch={handleSerch} setFilter={setTaskFilter} 
       />
      <div className="m-5" />
      {/* タスク一覧テーブル */}
      <TaskTable tasks={fetchedTasks} statuses={fetchedStatuses}
      sortStatus={sortStatus} setSortStatus={setSortStatus} />
    </PageLayout>
  )
}
