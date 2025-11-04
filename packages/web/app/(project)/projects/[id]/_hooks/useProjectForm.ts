import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useSWR from "swr"
import { fetchProject } from "../../../_query/projectQuery"
import { useEffect, useState } from "react"
import { createProjectSchemaFromEntity, projectFormSchema, ProjectFormSchema } from "@/app/(project)/_schema/projectSchema"
import { RawProfile } from "@/app/(auth)/_schema/profileSchema"

/** プロジェクトフォームを取得する */
export const useProjectForm = ({id, members}: {id: number, members: RawProfile[]}) => {

  /** プロジェクトフォームのデフォルト値 */
  const defaultProject: ProjectFormSchema = {
    id: 0,
    name: "",
    detail: "",
    is_public: false,
    members: [],
    created_at: undefined,
    updated_at: undefined
  }

  // プロジェクトフォームの状態を作成する
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultProject
  })

  // IDに紐づくプロジェクトを取得する
  const { data: projectEntity, error, mutate, isLoading } = useSWR(
    id ? ["プロジェクト", id] : null,
    () => fetchProject(id)
  )

  // エラーをチェックする
  if (error) throw error

  /** 取得時のプロジェクトデータ */
  const [fetchedProject, setFetchedProject] = useState(defaultProject)

  // プロジェクトを取得できた場合、状態にセットする
  useEffect(() => {
    if (projectEntity != null) {
      const schemaProject = createProjectSchemaFromEntity(projectEntity, members)
      setFetchedProject(schemaProject)
      reset(schemaProject)
    }
  }, [projectEntity])

  /** 現在の入力データ */
  const currentProjects = watch()

  /** 値を変更したかどうか */
  const isValueChanged = 
    currentProjects.name !== fetchedProject.name ||
    currentProjects.detail !== fetchedProject.detail ||
    currentProjects.is_public !== fetchedProject.is_public

  return {
    register,
    errors,
    setValue,
    watch,
    isValueChanged,
    setForm: reset,
    handleSubmit,
    fetchedProject,
    refresh: mutate,
    isLoading
  }
}
