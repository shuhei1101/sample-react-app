export type TaskEntity = {
  id: number;
  name: string;
  detail: string;
  status_id: number;
  send_mail: boolean;
  created_at: Date;
  updated_at: Date;
};

export type TaskInsert = Omit<TaskEntity, "id" | "created_at"| "updated_at">
export type TaskUpdate = Omit<TaskEntity, "created_at">
export type TaskDelete = Pick<TaskEntity, "id" | "updated_at">

export type TaskStatusEntity = {
  id: number;
  name: string;
  created_at: Date;
};
