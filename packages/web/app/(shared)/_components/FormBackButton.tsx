import { Button } from "@mantine/core"
import { useRouter } from "next/navigation";

export const FormBackButton = ({isValueChanged}: {isValueChanged: boolean}) => {
  const onClick = () => {
    if (isValueChanged) {
      const isOk = window.confirm(
        "入力内容が破棄されますがよろしいですか？"
      );
      if (isOk) router.back() // 前画面へ遷移
    } else {
      router.back() // 前画面へ遷移
    }
  }

  const router = useRouter();
  return (
    <Button variant="outline" onClick={onClick}>閉じる</Button>
  )
}
