"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { createProjectFilterFromQueryObj, RawProject, ProjectColumns, ProjectFilterSchema } from "../_schema/projectSchema"
import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { useEffect, useState } from "react"
import { ProjectFilter } from "./_components/ProjectFilter"
import { TASKS_URL } from "../../(core)/appConstants"
import { AuthorizedPageLayout } from "../../(auth)/_components/AuthorizedPageLayout"
import { Button } from "@mantine/core"
import Link from "next/link"
import { useProjects } from "./_hooks/useProjects"

export default function Page() {
  const router = useRouter();

  /** プロジェクトフィルター状態 */
  const [projectFilter, setProjectFilter] = useState<ProjectFilterSchema>({})
  
  /** 検索実行用フィルター状態 */
  const [searchFilter, setSearchFilter] = useState<ProjectFilterSchema>({})
  
  /** クエリストリングの状態 */
  const searchParams = useSearchParams();
  
  // パラメータをプロジェクトフィルターにセットする
  useEffect(() => {
    const queryObj: ProjectFilterSchema = searchParams ? Object.fromEntries(searchParams.entries()): {}
    setProjectFilter(createProjectFilterFromQueryObj(queryObj))
  }, [searchParams])
  
  /** ソート状態 */
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<RawProject>>({
    columnAccessor: 'id' as ProjectColumns,
    direction: 'asc',
  })

  /** ページャ状態 */
  const [page, setPage] = useState<number>(1)
  const pageSize = 10

  /** ページ変更時のイベント */
  const handleChangedPage = (page: number) => {
    setPage(page)
  }
  
  // プロジェクト一覧を取得する
  const { fetchedProjects, isLoading: projectLoading, refresh, totalRecords } = useProjects({
    filter: searchFilter,
    sortColumn: sortStatus.columnAccessor as ProjectColumns,
    sortOrder: sortStatus.direction,
    page,
    pageSize
  })

  /** 検索ボタン押下時のハンドル */
  const handleSerch = () => {
    // プロジェクトフィルターをクエリストリングに変換する
    const paramsObj = Object.fromEntries(
      Object.entries(projectFilter).map(([k, v]) => [k, String(v)])
    )
    const params = new URLSearchParams(paramsObj)

    // フィルターをURLに反映する
    router.push(`${TASKS_URL}?${params.toString()}`)

    // 検索フィルターを更新し、一覧を更新する
    setSearchFilter(projectFilter)
  }

  return (
    <AuthorizedPageLayout title="プロジェクト一覧" actionButtons={(
      <Button onClick={() => {
        router.push("/projects/new")
      }}>新規作成</Button>
    )}>
      {/* 検索条件欄 */}
      <ProjectFilter filter={projectFilter} handleSearch={handleSerch} setFilter={setProjectFilter} 
       />
      <div className="m-5" />
      {/* プロジェクト一覧テーブル */}
      <DataTable<RawProject> 
        withTableBorder 
        highlightOnHover
        noRecordsText=""
        noRecordsIcon={<></>}
        records={fetchedProjects}
        columns={[
          { accessor: 'id', title: 'ID', sortable: true, resizable: true,
            render: (project) => {
            const url = `/projects/${project.id}`
            return (<Link href={url} className="text-blue-400">{project.id}</Link>)}
          },
          { accessor: 'name', title: 'プロジェクト名', sortable: true, resizable: true },
          { accessor: 'detail', title: '詳細', sortable: true, resizable: true },
          { accessor: 'is_public', title: '公開／非公開', sortable: true, resizable: true,
            render: (project) => project.is_public ? "公開" : "非公開"
          }
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={totalRecords}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={handleChangedPage}
      />
    </AuthorizedPageLayout>
  )
}
