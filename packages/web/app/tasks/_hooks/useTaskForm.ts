import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskEntityToSchema, taskFormSchema, TaskFormSchema } from "../_schema/taskSchema"
import useSWR from "swr"
import { fetchTask } from "../_query/taskQuery"
import { useEffect, useState } from "react"

/** タスクフォームを取得する */
export const useTaskForm = ({id}: {id: number}) => {

  /** タスクフォームのデフォルト値 */
  const defaultTask: TaskFormSchema = {
    id: 0,
    name: "",
    detail: "",
    statusId: undefined,
    sendMail: false,
    createdAt: undefined,
    updatedAt: undefined
  }

  // タスクフォームの状態を作成する
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema) as any,
    defaultValues: defaultTask
  })

  // IDに紐づくタスクを取得する
  const { data: taskEntity, error, mutate, isLoading } = useSWR(
    id ? ["タスク", id] : null,
    () => fetchTask(id)
  )

  // エラーをチェックする
  if (error) throw error

  /** 取得時のタスクデータ */
  const [fetchedTask, setFetchedTask] = useState(defaultTask)

  // タスクを取得できた場合、状態にセットする
  useEffect(() => {
    if (taskEntity != null) {
      const schemaTask = taskEntityToSchema(taskEntity)
      setFetchedTask(schemaTask)
      reset(schemaTask)
    }
  }, [taskEntity])

  /** 現在の入力データ */
  const currentTasks = watch()

  /** 値を変更したかどうか */
  const isValueChanged = 
    currentTasks.name !== fetchedTask.name ||
    currentTasks.detail !== fetchedTask.detail ||
    currentTasks.statusId !== fetchedTask.statusId ||
    currentTasks.sendMail !== fetchedTask.sendMail

  return {
    register,
    errors,
    setValue,
    watch,
    isValueChanged,
    setForm: reset,
    handleSubmit,
    fetchedTask,
    refresh: mutate,
    isLoading
  }
}
