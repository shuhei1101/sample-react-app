import { projectDao } from "../_data-access/projectDao";
import { projectMemberDao } from "../_data-access/projectMemberDao";
import { ProjectFormSchema } from "../_schema/projectSchema";

/** プロジェクトを作成する */
export const createProject = async (project: ProjectFormSchema) => {
  // プロジェクトを挿入する
  const id = await projectDao.insert({
    name: project.name,
    detail: project.detail,
    is_public: project.is_public!,
  })
  
  // プロジェクトメンバーを登録する
  await projectMemberDao.bulkInsert(
    project.members.map((member) => {
      return {
        project_id: id,
        user_id: member.user_id
      }
    })
  )
  
  return id
}
