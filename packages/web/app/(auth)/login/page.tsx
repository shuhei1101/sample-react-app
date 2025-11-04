"use client"
import { BackgroundImage, Button, Center, Fieldset, PasswordInput, Tabs, TextInput, Title } from "@mantine/core";
import { FeedbackMessageWrapper } from "../../(shared)/_components/FeedbackMessageWrapper";
import { useState } from "react";
import { IconDualScreen, IconDualScreenFilled } from "@tabler/icons-react";
import { useLogin } from "./_hooks/useLogin";
import { useSignUp } from "./_hooks/useSignUp";
import { useLoginForm } from "./_hooks/useLoginForm";

// 1~10のランダムの数を計算する
// const randomNumber: number = Math.floor(Math.random() * 10) + 1;

export default function Page() {

  /** ハンドラ */
  const { handleLogin } = useLogin()
  const { handleSignUp } = useSignUp()

  // 新規登録かサインインかを判定する状態
  const [isLogin, setIsLogin] = useState<boolean>(true)

  // ログインフォームを取得する
  const { register, errors, setValue: setTaskValue, watch: watchTask, isValueChanged, handleSubmit} = useLoginForm();

  // TODO: デバッグ（削除予定）
  console.log("Form errors:", errors)
  console.log("Form values:", JSON.stringify(watchTask()))
  console.log("Is form valid:", Object.keys(errors).length === 0)

  return (
    <FeedbackMessageWrapper>
      <div className="h-screen flex flex-col items-center justify-center">
        {/* 入力欄の背景 */}
        <BackgroundImage maw={700} mih={350}
          src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`}
          radius="md"
        >
          <Center p="md" className="flex flex-col gap-5">
            {/* タイトル */}
            <Title order={1} c={"white"}>サンプルアプリ</Title>
            <form onSubmit={handleSubmit((form) => isLogin ? handleLogin(form) : handleSignUp(form))}>
              {/* タブ */}
              <Tabs defaultValue="ログイン" variant="pills">
                <Tabs.List>
                  <Tabs.Tab value="ログイン" leftSection={<IconDualScreen size={14} color="white" />} 
                  onClick={() => setIsLogin(true)}>
                    <p className="text-white font-bold">ログイン</p>
                  </Tabs.Tab>
                  <Tabs.Tab value="新規登録" leftSection={<IconDualScreenFilled size={14} color="white" />} 
                  onClick={() => setIsLogin(false)}>
                    <p className="text-white font-bold">新規登録</p>
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
              {/* 入力フォーム */}
              <Fieldset legend="" w={350}>
                <TextInput label="メールアドレス" type="email" {...register("email")} />
                <PasswordInput withAsterisk
                  label="パスワード"
                  placeholder="6文字以上"
                  {...register("password")}
                  />
              </Fieldset>
              <div className="m-3" />
              {/* サブミットボタン */}
              <div className="flex justify-end gap-5 w-full">
                <Button type="submit" variant="default">決定</Button>
              </div>
            </form>
          </Center>
        </BackgroundImage>
      </div>
    </FeedbackMessageWrapper>
  )
}
