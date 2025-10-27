import { taskDao } from "../_data-access/taskDao";
import { TaskFormSchema } from "../_schema/taskSchema";

/** タスクを更新する */
export const updateTask = (task: TaskFormSchema) => {
  // タスクを更新する
  taskDao.update({
    id: task.id!,
    name: task.name,
    detail: task.detail,
    status_id: task.statusId!,
    send_mail: task.sendMail,
    updated_at: task.updatedAt!,
  })
}
