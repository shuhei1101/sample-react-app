import { task_statuses, tasks } from "@/app/generated/prisma/client"
import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { getStatusName } from "../_schema/taskStatusSchema"
import { Dispatch, SetStateAction } from "react"
import Link from "next/link"

/** タスクテーブル */
export const TaskTable = ({tasks, statuses, sortStatus, setSortStatus}: {
  tasks: tasks[] | undefined,
  statuses: task_statuses[],
  sortStatus: DataTableSortStatus<tasks>,
  setSortStatus: Dispatch<SetStateAction<DataTableSortStatus<tasks>>>
}) => {
  
  return (
    <DataTable<tasks> 
      withTableBorder 
      highlightOnHover
      noRecordsText="該当のデータが見つかりません。"
      records={tasks}
      columns={[
        { accessor: 'id', title: 'ID', sortable: true, resizable: true,
          render: (task) => {
          const url = `/tasks/${task.id}`
          return (<Link href={url} className="text-blue-400">{task.id}</Link>)}
        },
        { accessor: 'name', title: 'タスク名', sortable: true, resizable: true },
        { accessor: 'detail', title: '詳細', sortable: true, resizable: true },
        { accessor: 'status_id', title: 'ステータス', sortable: true, resizable: true,
          render: (task) => getStatusName(statuses, task.status_id)
        }
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  )
}
