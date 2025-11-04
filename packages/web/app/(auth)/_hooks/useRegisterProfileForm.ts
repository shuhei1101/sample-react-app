import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileFormSchema, ProfileFormSchema } from "../_schema/profileSchema"

/** プロフィールフォームを取得する */
export const useProfileForm = () => {

  /** プロフィールフォームのデフォルト値 */
  const defaultProfile: ProfileFormSchema = {
    name: "",
    user_id: undefined,
    created_at: undefined,
    updated_at: undefined
  }

  // プロフィールフォームの状態を作成する
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfile
  })

  return {
    register,
    errors,
    setValue,
    watch,
    setForm: reset,
    handleSubmit,
  }
}
