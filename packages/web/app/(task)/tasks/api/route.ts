import { NextRequest, NextResponse } from "next/server";
import { taskFormSchema, taskId } from "../_schema/taskSchema";
import { createTask } from "../_repository/createTask";

/** タスクを登録する */
export async function POST(
  request: NextRequest,
) {
  try {
    // bodyからタスクを取得する
    const body = await request.json()
    const task = taskFormSchema.parse(body);

    // タスクを登録する
    const data = createTask(task);

    // 作成されたタスクのIDを返却する
    const id = taskId.parse(data)
    return NextResponse.json({ message: "登録成功", id });

  } catch (error) {
    return NextResponse.json(
      {error: "タスクの取得に失敗しました"},
      { status: 500 }
    );
  }
}
