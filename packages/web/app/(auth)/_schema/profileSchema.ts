import { z } from "zod";

/** DBのプロフィールスキーマ */
export const rawProfile = z.object({
  user_id: z.string(),
  name: z.string(),
  type: z.number(),
  created_at: z.string(),
  updated_at: z.string()
})
export type RawProfile = z.infer<typeof rawProfile>

// 更新用
export type ProfileInsert = Pick<RawProfile, "name" | "user_id">
export type ProfileUpdate = Omit<RawProfile, "created_at">
export type ProfileDelete = Pick<RawProfile, "user_id" | "updated_at">

// プロフィールのカラム名
export type ProfileColumns = keyof RawProfile;

/** プロフィールフォームスキーマ */
export const profileFormSchema = z.object({
  /** プロフィール名 */
  name: z.string().nonempty({error: "氏名は必須です。"}).regex(/^\S+\u3000\S+$/, { // 名前と苗字の間に空白1つ
    message: "姓と名の間に空白を入力してください",
  }),
  /** ユーザタイプ */
  type: z.number().optional(),
  /** UUID */
  user_id: z.string().optional(),
  /** 作成日時 */
  created_at: z.string().optional(),
  /** 更新日時 */
  updated_at: z.string().optional()
})

/** プロフィールフィルター */
export type ProfileFilterSchema = Partial<Pick<RawProfile, 
  "name"
>>

/** プロフィールフォームスキーマの型 */
export type ProfileFormSchema = z.infer<typeof profileFormSchema>;

/** エンティティからプロフィールフォームスキーマを生成する */
export const createProfileSchemaFromEntity = (entity: RawProfile): ProfileFormSchema => {
  return {
    name: entity.name,
    user_id: entity.user_id,
    created_at: entity.created_at,
    updated_at: entity.updated_at
  }
}

/** クエリオブジェクトからプロフィールフィルターに変換する */
export const createProfileFilterFromQueryObj = (queryObj: any) => {
  // クエリオブジェクトが空の場合はリターンする
  if (!queryObj) return {}

  const result: ProfileFilterSchema = {}

  // 氏名をセットする
  result.name = queryObj.name ?? undefined
  
  return result
}
