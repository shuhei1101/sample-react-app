"use client";

import { useEffect, useState } from "react";
import { SetTaskForm } from "../_schema/taskSchema";
import { fetchTask } from "../_repository/fetchTask";

export const useTask = ({setForm, id, isNew  }: {
  setForm: SetTaskForm,
  id: number,
  isNew: boolean,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /** 指定IDのタスクを読み込む */
    const loadTaskData = async () => {
      // 新規登録時は処理を終了する
      if ( isNew ) return

      try {
        // ロード中にする
        setLoading(true)

        const task = await fetchTask({ id });
        if (!task) {
          console.log("タスクが存在しません");
          return;
        }
        
        // 表示タスクを更新する
        setForm({
          id: task.id,
          name: task.name,
          detail: task.detail,
          sendMail: task.sendMail,
          statusId: task.status
        });
        // ロード中を解除する
        setLoading(false)

      } catch (error) {
        console.log(error)
        alert(`タスクの取得に失敗しました。${error}` )
        throw error;
      }
    };

  // 関数を実行する
  loadTaskData();
  }, []);

  return {
    loading
  }
}
