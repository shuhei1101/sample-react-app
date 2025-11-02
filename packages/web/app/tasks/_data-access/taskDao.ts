import { DatabaseError } from "@/app/(core)/appError";
import { taskExclusiveControl } from "./taskExclusiveControl";
import { prisma } from "@/app/(core)/prisma";
import { TaskDelete, TaskInsert, TaskUpdate } from "../_schema/taskSchema";

export const taskDao = {
  /** タスクを挿入する */
  insert: async (record: TaskInsert) => {
    try {
      // レコードを挿入する
      const newTask = await prisma.tasks.create({
        data: record
      })
      // 作成されたIDを返却する
      return newTask.id
    } catch (error) {
    console.log(`タスクの作成に失敗しました。: ${error}`)
      throw new DatabaseError('タスクの作成に失敗しました。')
    }
  },

  /** タスクを更新する */
  update: async (record: TaskUpdate) => {
    // 存在をチェックする
    const beforeTask = await taskExclusiveControl.existsCheck(record.id)
    
    // 更新日時による排他制御を行う
    taskExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeTask.updated_at, 
      afterDate: record.updated_at
    })
    
  try {
        // タスクを更新する
      await prisma.tasks.update({
        data: record,
        where: { id: record.id }
      })
    } catch (error) {
      // エラーをチェックする
      console.log(`タスクの更新に失敗しました。: ${error}`)
      throw new DatabaseError(`タスクの更新に失敗しました。`);
    }
  },

  /** タスクを削除する */
  delete: async (record: TaskDelete) => {
    // 存在をチェックする
    const beforeTask = await taskExclusiveControl.existsCheck(record.id)
    
    // 更新日時による排他制御を行う
    taskExclusiveControl.hasAlreadyUpdated({
      beforeDate: beforeTask.updated_at, 
      afterDate: record.updated_at
    })
    
    try {
      // タスクを削除する
      await prisma.tasks.delete({
        where: {id: record.id}
      })
    } catch (error) {
      // エラーをチェックする
      console.log(`タスクの削除に失敗しました。: ${error}`)
      throw new DatabaseError(`タスクの削除に失敗しました。`);
    }
  }
}
