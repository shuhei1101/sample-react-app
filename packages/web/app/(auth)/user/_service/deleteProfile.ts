import { ProfileFormSchema } from "../../_schema/profileSchema"
import { profileDao } from "../_data-access/profileDao"

/** プロフィールを削除する */
export const deleteProfile = async (profile: ProfileFormSchema) => {
  // プロフィールを削除する
  await profileDao.delete({
    user_id: profile.user_id!,
    updated_at: profile.updated_at!
  })
}
