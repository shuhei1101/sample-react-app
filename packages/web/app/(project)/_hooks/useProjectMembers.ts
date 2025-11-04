"use client"

import useSWR from "swr"
import { fetchProjectMembers } from "../_query/projectMemberQuery"

/** プロジェクトメンバーを取得する */
export const useProjectMembers = (project_id: number) => {

  if (!project_id) return {
    fetchedMembers: []
  }

  // IDに紐づくプロジェクトメンバーIDを取得する
  const { data: members, error, mutate, isLoading } = useSWR(
    ["プロジェクトメンバー", project_id],
    () => fetchProjectMembers(project_id)
  )

  // エラーをチェックする
  if (error) throw error

  return {
    fetchedMembers: members ?? [],
    isLoading,
    refresh :mutate
  }
}
