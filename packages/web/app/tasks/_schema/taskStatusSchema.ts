import { z } from "zod"
import { TaskStatusEntity } from "../_data-access/taskEntity"

/** タスクステータススキーマ */
export const taskStatusSchema = z.object({
  id: z.number(),
  name: z.string()
})

/** タスクステータスの型 */
export type TaskStatusSchema = z.infer<typeof taskStatusSchema>

/** エンティティからタスクステータスを生成する */
export const createTaskStatusFromEntity = (entity: TaskStatusEntity): TaskStatusSchema => {
  return {
    id: entity.id,
    name: entity.name,
  }
}

/** エンティティリストからタスクステータスリストを生成する */
export const createTaskStatusesFromEntities = (entities: TaskStatusEntity[]): TaskStatusSchema[] => {
  return entities.map((entity) => createTaskStatusFromEntity(entity))
}
