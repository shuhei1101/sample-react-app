import { RawProfile, rawProfile } from "@/app/(auth)/_schema/profileSchema";
import { z } from "zod";

/** DBのプロジェクトスキーマ */
export const rawProject = z.object({
  id: z.number(),
  name: z.string(),
  detail: z.string(),
  is_public: z.boolean(),
  created_at: z.string(),
  updated_at: z.string()
})
export type RawProject = z.infer<typeof rawProject>

// 更新用
export type ProjectInsert = Omit<RawProject, "id" | "created_at"| "updated_at">
export type ProjectUpdate = Omit<RawProject, "created_at">
export type ProjectDelete = Pick<RawProject, "id" | "updated_at">

// プロジェクトのカラム名
export type ProjectColumns = keyof RawProject;

/** プロジェクトフォームスキーマ */
export const projectFormSchema = z.object({
  /** プロジェクトID */
  id: z.number().optional(),
  /** プロジェクト名 */
  name: z.string().nonempty({error: "プロジェクト名は必須です。"}).min(3, { error: "プロジェクト名は3文字以上で入力してください。"}).max(20, { error: "プロジェクト名は20文字以下で入力してください。"}),
  /** プロジェクト詳細 */
  detail: z.string().max(200, { error: "プロジェクト詳細は200文字以下で入力してください。"}),
  /** 公開フラグ */
  is_public: z.boolean(),
  /** プロジェクトメンバーのID */
  members: z.array(rawProfile).min(1, {
    message: "プロジェクトには最低1人のメンバーが必要です。"
  }),
  /** 作成日時 */
  created_at: z.string().optional(),
  /** 更新日時 */
  updated_at: z.string().optional()
})

/** プロジェクトフォームスキーマの型 */
export type ProjectFormSchema = z.infer<typeof projectFormSchema>;

/** エンティティからプロジェクトフォームスキーマを生成する */
export const createProjectSchemaFromEntity = (entity: RawProject, members: RawProfile[]): ProjectFormSchema => {
  return {
    id: entity.id,
    name: entity.name,
    detail: entity.detail,
    members: members,
    is_public: entity.is_public,
    created_at: entity.created_at,
    updated_at: entity.updated_at
  }
}

/** プロジェクトフィルター */
export type ProjectFilterSchema = Partial<Pick<RawProject, 
  "id" | "name" | "is_public"
>>

/** クエリオブジェクトからプロジェクトフィルターに変換する */
export const createProjectFilterFromQueryObj = (queryObj: any) => {
  // クエリオブジェクトが空の場合はリターンする
  if (!queryObj) return {}

  const result: ProjectFilterSchema = {}

  // IDをセットする
  result.id = queryObj.id ?? undefined
  // プロジェクト名をセットする
  result.name = queryObj.name ?? undefined
  // 公開フラグをセットする
  result.is_public = queryObj.is_public ?? undefined
  
  return result
}
