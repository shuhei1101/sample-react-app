import { taskDao } from "../_data-access/taskDao";
import { TaskFormSchema } from "../_schema/taskSchema";

/** タスクを作成する */
export const createTask = (task: TaskFormSchema) => {
  // タスクを挿入する
  const id = taskDao.insert({
    name: task.name,
    detail: task.detail,
    status_id: task.statusId!,
    send_mail: task.sendMail,
  })
  return id
}
