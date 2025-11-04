import { RawProject, ProjectColumns, ProjectFilterSchema } from "../_schema/projectSchema";
import { SortOrder } from "@/app/(core)/appSchema";
import { clientSupabase } from "@/app/(core)/supabase/clientSupabase";

/** 検索条件に一致するプロジェクトを取得する */
export const fetchProjects = async ({
  sortColumn,
  sortOrder,
  filter,
  page,
  pageSize
}: {
  sortColumn: ProjectColumns,
  sortOrder: SortOrder,
  filter: ProjectFilterSchema,
  page: number,
  pageSize: number
}) => {
    // データを取得する
    let query = clientSupabase.from("projects").select('*', { count: 'exact' })

    // フィルター
    if (filter.id !== undefined) query = query.eq("id", filter.id)
    if (filter.name !== undefined) query = query.ilike("name", `%${filter.name}%`)
    if (filter.is_public !== undefined) query = query.eq("is_public", filter.is_public)

    // ソート
    query = query.order(sortColumn, {ascending: sortOrder === "asc"})

    // ページネーション
    query = query.range((page-1)*pageSize, page*pageSize-1)

    const { data, error, count } = await query

    if (error) throw error

    return {
      projects: data as RawProject[] ?? [],
      totalRecords: count
    }
}

/** IDに紐づくプロジェクトを取得する */
export const fetchProject = async (id: number) => {
  // データを取得する
  const { data, error } = await clientSupabase.from("projects")
      .select('*')
      .eq("id", id).single();

    // エラーをチェックする
    if (error) throw error;

    return data as RawProject
}
