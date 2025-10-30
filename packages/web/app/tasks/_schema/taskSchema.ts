import { z } from "zod";
import { UseFormSetValue, UseFormWatch, UseFormReset } from "react-hook-form";
import { TaskEntity } from "../_data-access/taskEntity";

/** タスクフォームスキーマ */
export const taskFormSchema = z.object({
  /** タスクID */
  id: z.number().optional(),
  /** タスク名 */
  name: z.string().nonempty({error: "タスク名は必須です。"}).min(3, { error: "タスク名は3文字以上で入力してください。"}).max(20, { error: "タスク名は20文字以下で入力してください。"}),
  /** タスク詳細 */
  detail: z.string().max(200, { error: "タスク詳細は200文字以下で入力してください。"}),
  /** タスクステータスID */
  statusId: z.number().optional(),
  /** メール送信フラグ */
  sendMail: z.boolean(),
  /** 作成日時 */
  createdAt: z.string().optional().transform((val) => val ? new Date(val) : undefined),
  /** 更新日時 */
  updatedAt: z.string().optional().transform((val) => val ? new Date(val) : undefined),
}).refine((data) => data.statusId !== undefined, {
  message: "ステータスは必須です。",
  path: ["statusId"],
})

/** タスクフォームスキーマの型 */
export type TaskFormSchema = z.infer<typeof taskFormSchema>;

/** タスク更新関数の型 */
export type SetTaskValue = UseFormSetValue<TaskFormSchema>;
export type SetTaskForm = UseFormReset<TaskFormSchema>;
/** タスク状態監視の型 */
export type UseTaskWatch = UseFormWatch<TaskFormSchema>;

/** エンティティからタスクフォームスキーマを生成する */
export const taskEntityToSchema = (entity: TaskEntity): TaskFormSchema => {
  return {
    id: entity.id,
    name: entity.name,
    detail: entity.detail,
    sendMail: entity.send_mail,
    statusId: entity.status_id,
    createdAt: entity.created_at,
    updatedAt: entity.updated_at
}
}
