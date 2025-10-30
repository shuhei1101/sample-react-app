import { taskDao } from "../_data-access/taskDao";
import { TaskFormSchema } from "../_schema/taskSchema";

/** タスクを作成する */
export const createTask = async (task: TaskFormSchema) => {
  // タスクを挿入する
  const id = await taskDao.insert({
    name: task.name,
    detail: task.detail,
    status_id: task.statusId!,
    send_mail: task.sendMail,
  })
  return id
}
