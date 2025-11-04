import { SortOrder } from "@/app/(core)/appSchema"
import { clientSupabase } from "@/app/(core)/supabase/clientSupabase"
import { ProfileColumns, ProfileFilterSchema, RawProfile } from "../_schema/profileSchema"
import { RawProfileType } from "../_schema/profileTypeSchema"

/** 検索条件に一致するプロフィールを取得する */
export const fetchProfiles = async ({
  sortColumn,
  sortOrder,
  filter,
  page,
  pageSize
}: {
  sortColumn: ProfileColumns,
  sortOrder: SortOrder,
  filter: ProfileFilterSchema,
  page: number,
  pageSize: number
}) => {
    // データを取得する
    let query = clientSupabase.from("profiles").select('*', { count: 'exact' })

    // フィルター
    if (filter.name !== undefined) query = query.ilike("name", `%${filter.name}%`)

    // ソート
    query = query.order(sortColumn, {ascending: sortOrder === "asc"})

    // ページネーション
    query = query.range((page-1)*pageSize, page*pageSize-1)

    const { data, error, count } = await query

    if (error) throw error

    return {
      profiles: data as RawProfile[] ?? [],
      totalRecords: count
    }
}

/** UserIdに紐づくプロフィールを取得する */
export const fetchProfile = async (userId: string) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("profiles")
      .select('*')
      .eq("user_id", userId)

    // エラーをチェックする
    if (error) throw error

    if (!data || data.length === 0) {
      return undefined
    }

    return data[0] as RawProfile
}


/** 全プロフィールタイプを取得する */
export const fetchProfileTypes = async () => {
  // データを取得する
  const { data, error } = await clientSupabase.from("profile_types")
    .select('*')

  // エラーをチェックする
  if (error) throw error

  return data as RawProfileType[] ?? []
}
