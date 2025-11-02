"use client"

import { useEffect } from "react"
import { appStorage } from "./(shared)/_sessionStorage/appStorage"
import { PageLayout } from "./(shared)/_components/PageLayout"
import { Button } from "@mantine/core"
import { useRouter } from "next/router"
import { HOME_URL } from "./(core)/appConstants"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  // レンダリング時の処理
  useEffect(() => {
    // セッションストレージにメッセージがある場合、表示する
    appStorage.feedbackMessage.out()
    console.error(error)
  }, [])

  return (
    <PageLayout title="エラー" actionButtons={(
      <Button onClick={() => {
        router.push(`${HOME_URL}`)
      }}>ホームへ</Button>
    )}>
    <div>
      <h2>Something went wrong!</h2>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
    </PageLayout>
  )
}
