"use client"

import { useEffect } from "react"
import { Button } from "@mantine/core"
import { useRouter } from "next/navigation"
import { appStorage } from "@/app/(core)/_sessionStorage/appStorage"
import { AuthorizedPageLayout } from "../../_components/AuthorizedPageLayout"
import { HOME_URL } from "@/app/(core)/appConstants"

export default function Page({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const router = useRouter()
  // レンダリング時の処理
  useEffect(() => {
    // セッションストレージにメッセージがある場合、表示する
    appStorage.feedbackMessage.out()
    console.error(error)
  }, [])

  return (
    <AuthorizedPageLayout title="権限エラー" actionButtons={(
      <Button onClick={() => {
        router.push(`${HOME_URL}`)
      }}>ホームへ</Button>
    )}>
    <div>
      <h2>この画面にアクセスする権限がありません。</h2>
    </div>
    </AuthorizedPageLayout>
  )
}
