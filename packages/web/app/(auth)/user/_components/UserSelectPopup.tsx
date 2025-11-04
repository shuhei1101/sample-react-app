"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { useEffect, useState } from "react"
import { Button, Modal } from "@mantine/core"
import { ProfileColumns, ProfileFilterSchema, RawProfile } from "../../_schema/profileSchema"
import { useProfiles } from "../_hooks/useProfiles"
import { UserFilter } from "./UserFilter"

export const UserSelectPopup = ({opened ,close, handleUsers}: {
  opened: boolean,
  close: () => void,
  handleUsers: (users: RawProfile[]) => void
}) => {
  /** プロフィールフィルター状態 */
  const [profileFilter, setProfileFilter] = useState<ProfileFilterSchema>({})
  
  /** 検索実行用フィルター状態 */
  const [searchFilter, setSearchFilter] = useState<ProfileFilterSchema>({})

  /** ソート状態 */
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<RawProfile>>({
    columnAccessor: 'name' as ProfileColumns,
    direction: 'asc',
  })

  /** ページャ状態 */
  const [page, setPage] = useState<number>(1)
  const pageSize = 10

  /** ページ変更時のイベント */
  const handleChangedPage = (page: number) => {
    setPage(page)
  }
  
  // プロフィール一覧を取得する
  const { fetchedProfiles, isLoading: profileLoading, refresh, totalRecords } = useProfiles({
    filter: searchFilter,
    sortColumn: sortStatus.columnAccessor as ProfileColumns,
    sortOrder: sortStatus.direction,
    page,
    pageSize
  })

  // 選択状態
  const [selectedRecords, setSelectedRecords] = useState<RawProfile[]>([]);

  /** 検索ボタン押下時のハンドル */
  const handleSerch = () => {
    // 検索フィルターを更新し、一覧を更新する
    setSearchFilter(profileFilter)
  }

  /** 確定ボタン押下時のハンドル */
  const handleConfirm = () => {
    // 引数のハンドルイベントを実行する
    handleUsers(selectedRecords)
    // ポップアップを閉じる
    close()
  }

  return (
    <Modal opened={opened} onClose={close} title="ユーザ選択画面">
      {/* 検索条件欄 */}
      <UserFilter filter={profileFilter} handleSearch={handleSerch} setFilter={setProfileFilter} />
      <div className="m-5" />
      {/* ユーザ一覧テーブル */}
      <DataTable<RawProfile> 
        withTableBorder
        highlightOnHover
        noRecordsText=""
        noRecordsIcon={<></>}
        records={fetchedProfiles}
        columns={[
          { accessor: 'name', title: '氏名', sortable: true, resizable: true },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={totalRecords}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={handleChangedPage}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
      <div className="m-4" />
      {/* 確定ボタン */}
      <div className="flex w-full justify-end gap-4">
        <Button onClick={handleConfirm}>確定</Button>
        <Button onClick={() => close()} variant="outline" >キャンセル</Button>
      </div>
    </Modal>
  )
}
