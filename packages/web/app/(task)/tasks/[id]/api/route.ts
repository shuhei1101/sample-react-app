import { NextRequest, NextResponse } from "next/server";
import { taskFormSchema, TaskId } from "../../_schema/taskSchema";
import { updateTask } from "../../_repository/updateTask";
import { deleteTask } from "../../_repository/deleteTask";

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
    return NextResponse.json(
      {error: "タスクの取得に失敗しました"},
      { status: 500 }
    );
  }
}

/** タスクを削除する */
export async function DELETE(
  { params }: { params: { id: TaskId } }
) {
  try {
    // 引数を取り出す
    const { id } = params;
    
    // タスクを削除する
    deleteTask(id)
    return NextResponse.json({ message: "タスクの削除に成功しました", id });

  } catch (error) {
    return NextResponse.json(
      {error: "タスクの取得に失敗しました"},
      { status: 500 }
    );
  }
}
