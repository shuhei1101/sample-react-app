import { z } from "zod";

/** プロフィールタイプIDからタイプ名を取得する */
export const getStatusName = (types: RawProfileType[], id?: number) => {
  return types.find(s => s.id === id)?.name
}

/** 取得時のタイプスキーマ */
export const rawProfileType
 = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string(),
})
export type RawProfileType = z.infer<typeof rawProfileType>
