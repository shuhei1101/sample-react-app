'use client';
import { PageLayout } from "@/app/(shared)/_components/PageLayout";
import { Box, Button, Checkbox, Group, Input, LoadingOverlay, Space, Textarea} from "@mantine/core";
import { useTaskForm } from "../_hooks/useTaskForm";
import { FormBackButton } from "@/app/(shared)/_components/FormBackButton";
import { TaskStatusCombobox } from "./TaskStatusCombobox";
import { useTaskStatuses } from "../../_hooks/useTaskStatuses";
import { useTaskDelete } from "../../_handlers/useTaskDelete";
import { useTaskSave } from "../../_handlers/useTaskSave";
import { useTaskUpdate } from "../../_handlers/useTaskUpdate";
type TaskFormProps = {
  /** タスクID */
  id?: string;
}

/** タスクフォーム */
export const TaskForm = (params: TaskFormProps) => {

  /** ハンドラ */
  const { handleDelete } = useTaskDelete()
  const { handleSave } = useTaskSave()
  const { handleUpdate } = useTaskUpdate()

  /** 新規登録フラグ */
  const isNew = !params.id || params.id === "";
  /** ID（数値型） */
  const id = params.id ? Number(params.id) : 0;
  
  // タスクフォームを取得する
  const { register: taskRegister, errors, setValue: setTaskValue, watch: watchTask, isValueChanged, handleSubmit, isLoading: taskLoading, fetchedTask } = useTaskForm({id});
  // タスクステータスを取得する
  const { fetchedStatuses, isLoading: statusLoading } = useTaskStatuses()
  /** 全体のロード状態 */
  const loading = statusLoading || taskLoading;

  /** ステータス変更時のハンドル */
  const handleChangedStatus = (val: number | undefined) => {
    // ステータスをセットする
    setTaskValue("statusId", val)
  }
 
  return (
    <>
      <PageLayout title={isNew ? "タスク作成": "タスク編集"} 
      actionButtons={<FormBackButton isValueChanged={isValueChanged} />}>
        <div>

        <Box pos="relative" className="max-w-120">
          {/* ロード中のオーバーレイ */}
          <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <form onSubmit={handleSubmit(isNew ? handleSave : handleUpdate)}>
              <div className="flex flex-col gap-2">
                <div>
                  <Input.Wrapper label="ID" error={errors.id?.message}>
                    <div className="h-6">
                      {/* idがない場合、「-」を表示する */}
                      <p>{ id != 0 ? id : "-" }</p>
                      <input type="hidden" value={id} {...taskRegister("id", { valueAsNumber: true })} />
                    </div>
                  </Input.Wrapper>
                </div>
                <div>
                  <Input.Wrapper label="タスク名" required error={errors.name?.message}>
                    <Input className="max-w-120" {...taskRegister("name")} />
                  </Input.Wrapper>
                </div>
                <div>
                    <Input.Wrapper label="タスク詳細" error={errors.detail?.message}>
                      <Textarea className="max-w-120" placeholder="200文字以内で入力してください。"
                      autosize minRows={4} maxRows={4} {...taskRegister("detail")} />
                    </Input.Wrapper>
                </div>
                <div>
                  <Input.Wrapper label="ステータス" required error={errors.statusId?.message}>
                    <TaskStatusCombobox taskStatuses={fetchedStatuses} currentValue={watchTask("statusId")} onChanged={handleChangedStatus} />
                  </Input.Wrapper>
                </div>
                <div>
                  <Input.Wrapper label="メール送信">
                    <Checkbox
                      {...taskRegister("sendMail")}
                    />
                  </Input.Wrapper>
                </div>
              </div>
            <Space h="md" />
            <Group>
              {isNew ? 
                <Button type="submit" loading={loading} >保存</Button>
              :
              <>
                <Button loading={loading} color="red.7" onClick={() => handleDelete(fetchedTask)} >削除</Button>
                <Button type="submit" loading={loading} >更新</Button>
              </>
              }
            </Group>
          </form>
        </Box>

        </div>
      </PageLayout>
    </>
  )
}
