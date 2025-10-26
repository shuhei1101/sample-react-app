import { z } from "zod";

/** 値オブジェクト */
export const taskStatusId = z.number().brand<'TaskStatusId'>()
export type TaskStatusId = z.infer<typeof taskStatusId>;

export const taskStatusname = z.string().brand<'TaskStatusname'>()
export type TaskStatusname = z.infer<typeof taskStatusname>;


/** タスクステータススキーマ */
export const taskStatusSchema = z.object({
  id: taskStatusId,
  name: taskStatusname
})

/** タスクステータスの型 */
export type TaskStatusSchema = z.infer<typeof taskStatusSchema>;
