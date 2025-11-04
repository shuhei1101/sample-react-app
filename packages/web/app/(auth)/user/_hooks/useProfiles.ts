"use client"

import useSWR from "swr"
import { ProfileColumns, ProfileFilterSchema } from "../../_schema/profileSchema"
import { fetchProfiles } from "../../_query/profileQuery"
import { SortOrder } from "@/app/(core)/appSchema"

/** プロフィールリストを取得する */
export const useProfiles = ({filter, sortColumn, sortOrder, page, pageSize}:{
  filter: ProfileFilterSchema, sortColumn: ProfileColumns, sortOrder: SortOrder, page: number, pageSize: number}) => {

  // 検索条件に紐づくプロフィールリストを取得する
  const { data, error, mutate, isLoading } = useSWR(
    ["プロフィールリスト", filter, sortColumn, sortOrder, page, pageSize],
    () => fetchProfiles({
      filter,
      sortColumn,
      sortOrder,
      page,
      pageSize,
    })
  )

  // エラーをチェックする
  if (error) throw error;

  return {
    fetchedProfiles: data?.profiles ?? [],
    totalRecords: data?.totalRecords ?? 0,
    isLoading,
    refresh :mutate
  }
}
