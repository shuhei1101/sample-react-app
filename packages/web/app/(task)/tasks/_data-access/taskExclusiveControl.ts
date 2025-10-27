import { DatabaseError } from "@/app/(core)/appError";
import { taskQuery } from "../_query/taskQuery";
import { TaskEntity } from "./taskEntity";

export const taskExclusiveControl = {
  /** 既に存在するかどうかを確認する */
  existsCheck: async (id: number) => {
    const record: TaskEntity = await taskQuery.fetchTask(id)
    if (record === undefined) throw new DatabaseError("既に削除されたタスクです。")
    return record
  },
  /** 他のユーザに更新されたか確認する（更新日時による排他チェック） */
  hasAlreadyUpdated: ({beforeDate, afterDate}: {
    beforeDate: Date,
    afterDate: Date
  }) => {
    if (beforeDate != afterDate) {
      // 排他例外を発生させる
      throw new DatabaseError("他のユーザによって更新されました。")
    }
  }
}
