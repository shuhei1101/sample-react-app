import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskDetail, taskFormSchema, TaskFormSchema, taskId, taskName, taskSendMail, taskStatusId } from "../_schema/taskSchema";

export const useTaskForm = () => {
    const defaultValues: TaskFormSchema = {
      id: taskId.parse(0),
      name: taskName.parse(""),
      detail: taskDetail.parse(""),
      statusId: taskStatusId.parse(undefined),
      sendMail: taskSendMail.parse(false)
    }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues
  })

  /** 現在の入力データ */
  const currentValues = watch();

  /** 値が入力されたかどうか */
  const isValueChanged = 
    currentValues.name !== defaultValues.name ||
    currentValues.detail !== defaultValues.detail ||
    currentValues.statusId !== defaultValues.statusId ||
    currentValues.sendMail !== defaultValues.sendMail

  return {
    register,
    errors,
    setValue,
    watch,
    isValueChanged,
    reset,
    handleSave: handleSubmit(handleSave),
    handleUpdate: handleSubmit(handleUpdate),
    handleDelete
  }

}
