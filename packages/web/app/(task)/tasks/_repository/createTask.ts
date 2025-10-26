import { supabase } from "@/app/(shared)/supabase"
import { TaskFormSchema } from "../_schema/taskSchema"

/** タスクを登録する */
export const createTask = async (record: TaskFormSchema) => {
  const { data, error } = await supabase.from("tasks")
    .insert([record])
    .select()
    .single();
  
  // エラーをチェックする
  if (error) throw error;
  
  // 更新されたIDを返却する
  return data.id;
}
