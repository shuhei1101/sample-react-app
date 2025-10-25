import { ReactNode } from "react"
import { Button, Space, Title } from "@mantine/core";

type PageLayoutProps = {
  title: string;
  actionButtons?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({ children, title, actionButtons }: PageLayoutProps) => {
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
    </div>
  )
}
