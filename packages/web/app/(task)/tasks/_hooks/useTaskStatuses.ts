"use client";

import { useEffect, useState } from "react";
import { taskStatusSchema, TaskStatusSchema } from "../_schema/taskStatusSchema";
import { taskQuery } from "../_query/taskQuery";

export const useTaskStatuses = () => {
  const [loading, setLoading] = useState(false);
  /** タスクステータス一覧 */
  const [taskStatuses, setTaskStatuses] = useState<TaskStatusSchema[]>([])
  
  useEffect(() => {
    // ロード中にする
    setLoading(true)

    /** タスクステータスを読み込む */
    const loadTaskStatuses = async () => {

      try {
        // タスクステータスを取得する
        const taskStatuses = await taskQuery.fetchTaskStatuses()

        if (taskStatuses.length === 0) {
          console.log("ステータスが存在しません");
          return
        }

        // タスクステータスの状態を更新する
        setTaskStatuses(taskStatuses.map(status => 
          taskStatusSchema.parse({
            id: status.id,
            name: status.name
          })
        ));

        // ロード中を解除する
        setLoading(false)

      } catch (error) {
        console.log(error)
        alert(`ステータスの取得に失敗しました。${error}` )
        throw error;
    }
  };
    // 関数を実行する
    loadTaskStatuses();
  }, []);

  return {
    taskStatuses,
    loading
  }
}
