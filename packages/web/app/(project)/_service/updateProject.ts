import { projectDao } from "../_data-access/projectDao";
import { projectMemberDao } from "../_data-access/projectMemberDao";
import { ProjectFormSchema } from "../_schema/projectSchema";

/** プロジェクトを更新する */
export const updateProject = async (project: ProjectFormSchema) => {
  // プロジェクトを更新する
  await projectDao.update({
    id: project.id!,
    name: project.name,
    detail: project.detail,
    is_public: project.is_public!,
    updated_at: project.updated_at!,
  })

  // プロジェクトメンバーを削除する
  await projectMemberDao.deleteByProjectId(project.id!)

  // プロジェクトメンバーを登録する
  await projectMemberDao.bulkInsert(
    project.members.map((member) => {
      return {
        project_id: project.id!,
        user_id: member.user_id
      }
    })
  )
}
