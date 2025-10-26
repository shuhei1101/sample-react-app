import { supabase } from "@/app/(shared)/supabase"
import { TaskId } from "../_schema/taskSchema"

/** タスクを削除する */
export const deleteTask = async (id: TaskId) => {
  const { error } = await supabase.from("tasks")
    .delete()
    .eq("id", id as number);
  
  // エラーをチェックする
  if (error) throw error;
}
