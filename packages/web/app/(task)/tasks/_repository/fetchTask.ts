import { supabase } from "@/app/(shared)/supabase"

/** IDに一致するタスクを取得する */
export const fetchTask = async ({id}: {
  id: number
}) => {
  // データを取得する
  const { data, error } = await supabase.from("tasks")
    .select('*')
    .eq("id", id).single();

  // エラーをチェックする
  if (error) throw error;

  return data
}
