import { z } from "zod";
import { UseFormSetValue, UseFormWatch, UseFormReset } from "react-hook-form";

/** 値オブジェクト */
export const taskId = z.number()
export type TaskId = z.infer<typeof taskId>;

export const taskName = z.string().nonempty({error: "タスク名は必須です。"}).min(3, { error: "タスク名は3文字以上で入力してください。"}).max(20, { error: "タスク名は20文字以下で入力してください。"})
export type TaskName = z.infer<typeof taskName>;

export const taskDetail = z.string().max(200, { error: "タスク詳細は200文字以下で入力してください。"})
export type TaskDetail = z.infer<typeof taskDetail>;

export const taskStatusId = z.number({ error: "ステータスは必須です。"}).nonoptional()
export type TaskStatusId = z.infer<typeof taskStatusId>;

export const taskSendMail = z.boolean()
export type TaskSendMail = z.infer<typeof taskSendMail>;


/** タスクスキーマ */
export const taskFormSchema = z.object({
  /** タスクID */
  id: taskId,
  /** タスク名 */
  name: taskName,
  /** タスク詳細 */
  detail: taskDetail,
  /** タスクステータスID */
  statusId: taskStatusId,
  /** メール送信フラグ */
  sendMail: taskSendMail
})

/** タスクスキーマの型 */
export type TaskFormSchema = z.infer<typeof taskFormSchema>;
/** タスク更新関数の型 */
export type SetTaskValue = UseFormSetValue<TaskFormSchema>;
export type SetTaskForm = UseFormReset<TaskFormSchema>;
/** タスク状態監視の型 */
export type UseTaskWatch = UseFormWatch<TaskFormSchema>;
