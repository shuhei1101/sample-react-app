import { taskDao } from "../_data-access/taskDao";
import { TaskFormSchema } from "../_schema/taskSchema";

/** タスクを削除する */
export const deleteTask = async (task: TaskFormSchema) => {
  // タスクを削除する
  await taskDao.delete({
    id: task.id!,
    updated_at: task.updatedAt!
  })
}
