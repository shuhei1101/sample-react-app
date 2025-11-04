'use client';
import { AuthorizedPageLayout } from "@/app/(auth)/_components/AuthorizedPageLayout";
import { Box, Button, Checkbox, Group, Input, LoadingOverlay, Space, Textarea} from "@mantine/core";
import { FormBackButton } from "@/app/(shared)/_components/FormBackButton";
import { useProjectDelete } from "../_hooks/useProjectDelete";
import { useProjectSave } from "../_hooks/useProjectSave";
import { useProjectUpdate } from "../_hooks/useProjectUpdate";
import { useProjectMembers } from "@/app/(project)/_hooks/useProjectMembers";
import { useProjectForm } from "../_hooks/useProjectForm";
import { ProjectMemberTable } from "./ProjectMemberTable";
import { UserSelectPopup } from "@/app/(auth)/user/_components/UserSelectPopup";
import { useDisclosure } from "@mantine/hooks";
import { RawProfile } from "@/app/(auth)/_schema/profileSchema";
import { PROJECTS_URL } from "@/app/(core)/appConstants";

/** プロジェクトフォーム */
export const ProjectForm = ( params: {
  /** プロジェクトID */
  id?: string;
}) => {

  /** ハンドラ */
  const { handleDelete } = useProjectDelete()
  const { handleSave } = useProjectSave()
  const { handleUpdate } = useProjectUpdate()

  /** 新規登録フラグ */
  const isNew = !params.id || params.id === "";
  /** ID（数値型） */
  const id = params.id ? Number(params.id) : 0;
  
  // プロジェクトメンバーを取得する
  const { fetchedMembers, isLoading: membersLoading } = useProjectMembers(id)
  // プロジェクトフォームを取得する
  const { register: projectRegister, errors, setValue: setProjectValue, watch: watchProject, isValueChanged, handleSubmit, isLoading: projectLoading, fetchedProject } = useProjectForm({id, members: fetchedMembers});
  /** 全体のロード状態 */
  const loading = projectLoading || projectLoading;

  // TODO: デバッグ（削除予定）
  console.log("プロジェクトフォーム errors:", errors)
  console.log("プロジェクトフォーム values:", JSON.stringify(watchProject()))
  console.log("Is プロジェクトフォーム valid:", Object.keys(errors).length === 0)
 
  /** ポップアップの表示状態 */
  const [popupOpened, { open: openPopup, close: closePopup }] = useDisclosure(false);

  /** ユーザ選択時のハンドル */
  const handleUsers = (users: RawProfile[]) => {
    // 選択されたユーザをメンバーに追加する
    setProjectValue("members", users)
  }

  return (
    <>
      <AuthorizedPageLayout title={isNew ? "プロジェクト作成": "プロジェクト編集"} 
      actionButtons={<FormBackButton isValueChanged={isValueChanged} previousScreenURL={PROJECTS_URL} />}>
        <div>

        <Box pos="relative" className="max-w-120">
          {/* ロード中のオーバーレイ */}
          <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, }} />
          {/* プロジェクト入力フォーム */}
          <form onSubmit={handleSubmit((form) => isNew ? handleSave(form) : handleUpdate(form))}>
            {/* 入力欄のコンテナ */}
            <div className="flex flex-col gap-2">
              {/* ID入力欄 */}
              <div>
                <Input.Wrapper label="ID" error={errors.id?.message}>
                  <div className="h-6">
                    {/* idがない場合、「-」を表示する */}
                    <p>{ id != 0 ? id : "-" }</p>
                    <input type="hidden" value={id} {...projectRegister("id", { valueAsNumber: true })} />
                  </div>
                </Input.Wrapper>
              </div>
              {/* プロジェクト名入力欄 */}
              <div>
                <Input.Wrapper label="プロジェクト名" required error={errors.name?.message}>
                  <Input className="max-w-120" {...projectRegister("name")} />
                </Input.Wrapper>
              </div>
              {/* プロジェクト詳細入力欄 */}
              <div>
                  <Input.Wrapper label="プロジェクト詳細" error={errors.detail?.message}>
                    <Textarea className="max-w-120" placeholder="200文字以内で入力してください。"
                    autosize minRows={4} maxRows={4} {...projectRegister("detail")} />
                  </Input.Wrapper>
              </div>
              {/* プロジェクトメンバーテーブル */}
              <Input.Wrapper label="プロジェクトメンバー" error={errors.members?.message} required>
                <ProjectMemberTable members={watchProject().members} onAddClick={()=>openPopup()} onUpdateClick={()=>openPopup()} />
              </Input.Wrapper>
              {/* 公開フラグ入力欄 */}
              <div>
                <Input.Wrapper label="公開／非公開">
                  <Checkbox
                    {...projectRegister("is_public")}
                  />
                </Input.Wrapper>
              </div>
            </div>
            <Space h="md" />
            {/* サブミットボタン */}
            <Group>
              {isNew ? 
                <Button type="submit" loading={loading} >保存</Button>
              :
              <>
                <Button loading={loading} color="red.7" onClick={() => handleDelete(fetchedProject)} >削除</Button>
                <Button type="submit" loading={loading} >更新</Button>
              </>
              }
            </Group>
          </form>
        </Box>
        </div>
        <UserSelectPopup close={closePopup} handleUsers={handleUsers} opened={popupOpened} />
      </AuthorizedPageLayout>
    </>
  )
}
