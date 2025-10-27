import { NextRequest, NextResponse } from "next/server";
import { taskFormSchema } from "../../_schema/taskSchema";
import { updateTask } from "../../_service/updateTask";
import { deleteTask } from "../../_service/deleteTask";
import { DatabaseError } from "@/app/(core)/appError";

/** タスクを更新する */
export async function PUT(
  request: NextRequest,
) {
  try {
    // bodyからタスクを取得する
    const body = await request.json()
    const task = taskFormSchema.parse(body);

    // タスクを更新する
    updateTask(task)
    return NextResponse.json({ message: "登録成功", task });

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

/** タスクを削除する */
export async function DELETE(
  request: NextRequest,
) {
  try {
    // bodyからタスクを取得する
    const body = await request.json()
    const task = taskFormSchema.parse(body);

    // タスクを削除する
    deleteTask(task)
    return NextResponse.json({ message: "タスクの削除に成功しました", task });

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
