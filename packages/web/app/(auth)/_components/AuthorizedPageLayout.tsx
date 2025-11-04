"use client"

import { ReactNode, useEffect } from "react"
import { LoadingOverlay, Title } from "@mantine/core";
import { FeedbackMessageWrapper } from "../../(shared)/_components/FeedbackMessageWrapper";
import Header from "../../(shared)/_components/Header";
import { useDisclosure } from "@mantine/hooks";
import { RegisterNamePopup } from "./RegisterNamePopup";
import { useLoginUserInfo } from "../_hooks/useLoginUserInfo";

/** 認証済みのページに適用するレイアウト */
export const AuthorizedPageLayout = ({ children, title, actionButtons }: {
  title: string;
  actionButtons?: ReactNode;
  children: ReactNode;
}) => {

  /** 名前入力ポップアッププロパティ */
  const [popupOpened, { open: openPopup, close: closePopup }] = useDisclosure(false);

  /** ログインユーザ情報 */
  const {userId, userInfo, isLoading} = useLoginUserInfo()

  // 初回ロード時
  useEffect(() => {
    if (!isLoading) {
      // ユーザ情報を取得できなかった場合
      if (!userInfo) {
        // 名前入力ポップアップを表示する
        openPopup()
      }
    }
  }, [userInfo, isLoading])
  
  return (
    <>
    {/* ロード中のオーバーレイ */}
    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 0 }}
    loaderProps={{ children: ' ' }} />
    {/* フィードバックメッセージラッパー */}
    <FeedbackMessageWrapper>
      {/* ヘッダー */}
      <Header />
      <div className="m-3" />
      <div className="m-3">
      <div className="flex">
        {/* タイトル */}
        <Title order={2} className="text-blue-500">
          {title}
        </Title>
        <div className="flex-1" />
        {/* アクションボタン（左側のボタン群） */}
        {actionButtons}
      </div>
      <div className="m-3" />
        {/* 子コンポーネント */}
        {children}
      </div>
      <RegisterNamePopup close={closePopup} opened={popupOpened} userId={userId} />
    </FeedbackMessageWrapper>
    </>
  )
}
