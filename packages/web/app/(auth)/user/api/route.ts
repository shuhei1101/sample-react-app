import { NextRequest, NextResponse } from "next/server";
import { handleServerError } from "@/app/(core)/errorHandler";
import { profileFormSchema, ProfileFormSchema } from "../../_schema/profileSchema";
import { createProfile } from "../_service/createProfile";
import { updateProfile } from "../_service/updateProfile";
import { deleteProfile } from "../_service/deleteProfile";

export type RegisterProfileRequest = ProfileFormSchema;
export type RegisterProfileResponse = { id: number }
/** プロフィールを登録する */
export async function POST(
  request: NextRequest,
) {
  try {
    // bodyからプロフィールを取得する
    const body: RegisterProfileRequest = await request.json()
    const profile  = profileFormSchema.parse(body);

    // プロフィールを登録する
    const id = await createProfile(profile);

    const response: RegisterProfileResponse = {
      id: id,
    }

    // 作成されたプロフィールのIDを返却する
    return NextResponse.json(response);
  } catch (err) {
    return handleServerError(err)
  }
}

/** プロフィールを更新する */
export async function PUT(
  request: NextRequest,
) {
  try {
    // bodyからプロフィールを取得する
    const body: RegisterProfileRequest = await request.json()
    const profile = profileFormSchema.parse(body);

    // プロフィールを更新する
    await updateProfile(profile)
    
    // メッセージを返却する
    return NextResponse.json({});
  } catch (err) {
    return handleServerError(err)
  }
}

/** プロフィールを削除する */
export async function DELETE(
  request: NextRequest,
) {
  try {
    // bodyからプロフィールを取得する
    const body: RegisterProfileRequest = await request.json()
    const profile = profileFormSchema.parse(body);

    // プロフィールを削除する
    await deleteProfile(profile)

    return NextResponse.json({});
  } catch (err) {
    return handleServerError(err)
  }
}
