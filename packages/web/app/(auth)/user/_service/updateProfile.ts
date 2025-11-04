import { ProfileFormSchema } from "../../_schema/profileSchema"
import { profileDao } from "../_data-access/profileDao"

/** プロフィールを更新する */
export const updateProfile = async (profile: ProfileFormSchema) => {
  // プロフィールを更新する
  await profileDao.update({
    name: profile.name,
    updated_at: profile.updated_at!,
    type: profile.type!,
    user_id: profile.user_id!
  })
}
