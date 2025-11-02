import { task_statuses } from "@/app/generated/prisma/client"
import { z } from "zod";

  /** タスクステータスIDからステータス名を取得する */
  export const getStatusName = (statuses: task_statuses[], id?: number) => {
    return statuses.find(s => s.id === id)?.name
  }
