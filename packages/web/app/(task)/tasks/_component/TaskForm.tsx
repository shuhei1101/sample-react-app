'use client';
import { PageLayout } from "@/app/(shared)/_components/PageLayout";
import { Button, Checkbox, Group, Input, Space, Textarea} from "@mantine/core";
import { useTaskForm } from "../_hooks/useTaskForm";
import { FormBackButton } from "@/app/(shared)/_components/FormBackButton";
import { TaskStatusCombobox } from "./TaskStatusCombobox";
import { useTask } from "../_hooks/useTask";
import { useTaskStatuses } from "../_hooks/useTaskStatuses";

type TaskFormProps = {
  id?: string;
}

export const TaskForm = (params: TaskFormProps) => {
  /** タスクフォーム */
  const { register, errors, setValue, watch, isValueChanged, reset } = useTaskForm();
  /** 新規登録フラグ */
  const isNew = !params.id || params.id === "";
  /** ID（数値型） */
  const id = params.id ? parseInt(params.id, 10) : 0;

  // タスクステータスを取得する
  const { taskStatuses, loading: statusLoading } = useTaskStatuses()
  // タスクを取得する
  const { loading: taskLoading } = useTask({ id, isNew, setForm: reset });
  /** 全体のロード状態 */
  const loading = statusLoading || taskLoading;

  // ローディング画面を表示する
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout title={isNew ? "タスク作成": "タスク編集"} 
    actionButtons={<FormBackButton isValueChanged={isValueChanged} />}>
      <div>
        <form>
          <div className="flex flex-col gap-2">
            <div>
              <Input.Wrapper label="ID" error={errors.id?.message} required>
                <div className="h-6">
                  <p>{ id != 0 ? id : "-" }</p>
                  <input type="hidden" value={id} {...register("id", { valueAsNumber: true })} />
                </div>
              </Input.Wrapper>
            </div>
            <div>
              <Input.Wrapper label="タスク名" required error={errors.name?.message}>
                <Input className="max-w-120" {...register("name")} />
              </Input.Wrapper>
            </div>
            <div>
                <Input.Wrapper label="タスク詳細" required error={errors.detail?.message}>
                  <Textarea className="max-w-120" placeholder="200文字以内で入力してください。"
                  autosize minRows={4} maxRows={4} {...register("detail")} />
                </Input.Wrapper>
            </div>
            <div>
              <Input.Wrapper label="ステータス" required error={errors.statusId?.message}>
                <TaskStatusCombobox setValue={setValue} watch={watch} taskStatuses={taskStatuses} />
              </Input.Wrapper>
            </div>
            <div>
              <Input.Wrapper label="メール送信" required>
                <Checkbox
                  {...register("sendMail")}
                />
              </Input.Wrapper>
            </div>
          </div>
        <Space h="md" />
        <Group>
          {isNew ? 
            <Button type="submit" loading={loading}>保存</Button>
          :
          <>
            <Button loading={loading} color="red.7" >削除</Button>
            <Button type="submit" loading={loading}>更新</Button>
          </>
          }
        </Group>
      </form>

      </div>
    </PageLayout>
  )
}
