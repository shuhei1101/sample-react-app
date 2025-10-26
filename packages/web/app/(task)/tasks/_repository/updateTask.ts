import { supabase } from "@/app/(shared)/supabase"
import { TaskFormSchema } from "../_schema/taskSchema"

/** タスクを更新する */
export const updateTask = async (record: TaskFormSchema) => {
    const {error} = await supabase.from("tasks").update([record]);

    // エラーをチェックする
  if (error) throw error;
}
