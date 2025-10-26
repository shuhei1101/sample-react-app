import { taskApi } from "../_client/taskApi";
import { TaskFormSchema } from "../_schema/taskSchema";

const handleSave = async (task: TaskFormSchema) => {
  const data = await taskApi.create(task);
};
