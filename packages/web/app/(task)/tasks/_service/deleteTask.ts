import { taskDao } from "../_data-access/taskDao";
import { TaskFormSchema } from "../_schema/taskSchema";

/** タスクを削除する */
export const deleteTask = (task: TaskFormSchema) => {
  // タスクを削除する
  taskDao.delete({
    id: task.id!,
    updated_at: task.updatedAt!
  })
}
