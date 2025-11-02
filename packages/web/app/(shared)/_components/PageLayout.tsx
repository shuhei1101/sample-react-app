"use client"

import { ReactNode, useEffect } from "react"
import { Button, Space, Title } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { appStorage } from "../_sessionStorage/appStorage";

type PageLayoutProps = {
  title: string;
  actionButtons?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({ children, title, actionButtons }: PageLayoutProps) => {
  // レンダリング時の処理
  useEffect(() => {
    // セッションストレージにメッセージがある場合、表示する
    appStorage.feedbackMessage.out();
  }, []);
  
  return (
    <div>
      <div className="flex">
        <Title order={2} className="text-blue-500">
          {title}
        </Title>
        <div className="flex-1" />
        {actionButtons}
      </div>
      <Space h="md" />
      {children}
      <Toaster />
    </div>
    

  )
}
