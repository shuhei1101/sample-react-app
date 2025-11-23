"use client"

import { Suspense, useState } from "react";
import { AuthorizedPageLayout } from "@/app/(auth)/_components/AuthorizedPageLayout";
import { ActionIcon, Button, Container, Input, Paper, Text, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconSend } from "@tabler/icons-react";
import { useSendMessage } from "./_hooks/useTaskQuestion";


function QuestionContent() {
  const router = useRouter();

  /** 入力欄の状態 */
  const [prompt, setPrompt] = useState<string>("");
  /** チャット */
  const [messages, setMessages] = useState<{
    text: string,
    type: "user" | "ai"
  }[]>([{
    text: "こんにちは。質問を入力してください。",
    type: "ai"
  }]);

  /** ハンドラ */
  const { handleSend } = useSendMessage()

  /** 送信ボタン押下時の処理 */
  const onClickSend = async (prompt: string) => {
    try {
    // 入力内容をメッセージに追加する
    setMessages(prev => [...prev, 
      {text: prompt, type: "user"},
    ])
    // 入力フィールドをクリアする
    setPrompt("")
    // 入力内容を送信する
    const data = await handleSend(prompt)
    setMessages(prev => [...prev, 
      {text: data!.answer, type: "ai"},
    ])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthorizedPageLayout title="タスク質問（AI）" actionButtons={(<></>)}>
      <div className="flex flex-col"  style={{ height: 'calc(100vh - 150px)' }}>
        {/* チャット表示欄 */}
        <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
          {messages.map((message, index) => {
            return (
              <div key={index} className={message.type === "ai" ? "flex justify-start" : "flex justify-end"}>
                <Paper
                  shadow="xs"
                  radius="xl"
                  p="sm"
                  className="max-w-2/3 min-h-0"
                  bg={message.type === "ai" ? undefined : "#ADFF2F"}
                >
                  <Text>{message.text}</Text>
                </Paper>
              </div>
            )
          })}
        </div>
        <div className="m-5" />
        {/* チャット入力欄 */}
        <div className="flex items-center gap-2">
          {/* 入力フィールド */}
          <Textarea className="w-full" placeholder="質問を入力してください。" autosize minRows={1} maxRows={4} 
            value={prompt}
            onChange={(event) => setPrompt(event.currentTarget.value)}
          />
          {/* 送信ボタン */}
          <ActionIcon onClick={()=>{
            onClickSend(prompt)
          }} variant="light" size="lg" disabled={prompt==""} >
            <IconSend style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </div>
      </div>
    </AuthorizedPageLayout>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <QuestionContent />
    </Suspense>
  )
}
