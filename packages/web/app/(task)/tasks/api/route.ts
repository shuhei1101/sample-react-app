import { NextRequest, NextResponse } from "next/server";
import { taskFormSchema } from "../_schema/taskSchema";
import { createTask } from "../_service/createTask";
import { DatabaseError } from "@/app/(core)/appError";

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
    const id = data
    return NextResponse.json({ message: "登録成功", id });

  } catch (error) {
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    } else {
      return NextResponse.json(
        {error: "タスクの取得に失敗しました"},
        { status: 500 }
      );
    }
  }
}
