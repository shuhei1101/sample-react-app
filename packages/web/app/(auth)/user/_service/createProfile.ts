import { ProfileFormSchema } from "../../_schema/profileSchema"
import { profileDao } from "../_data-access/profileDao"

/** プロフィールを作成する */
export const createProfile = async (profile: ProfileFormSchema) => {
  // プロフィールを挿入する
  const id = await profileDao.insert({
    name: profile.name,
    user_id: profile.user_id!
  })
  return id
}
