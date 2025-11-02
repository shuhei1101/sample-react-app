"use client";
import { HOME_URL, TASKS_URL } from '@/app/(core)/appConstants';
import { Burger, Drawer, Button, Badge, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome2, IconUsers, IconFiles, IconFolders, IconCircleOff } from '@tabler/icons-react';

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className='h-15 bg-blue-500 flex items-center p-2'>
        <Burger opened={opened} onClick={open} aria-label="Toggle navigation" />
      </div>
      <Drawer opened={opened} onClose={close} title="メニュー" size="xs">
        <NavLink
          href={`${HOME_URL}`}
          label="ホーム"
          leftSection={<IconHome2 size={16} stroke={1.5} />}
        />
        <NavLink
          href={`${TASKS_URL}`}
          label="タスク一覧"
          leftSection={<IconFiles size={16} stroke={1.5} />}
        />
        <NavLink
          href="#"
          label="プロジェクト一覧"
          leftSection={<IconFolders size={16} stroke={1.5} />}
        />
        <NavLink
          href="#"
          label="ユーザ管理"
          leftSection={<IconUsers size={16} stroke={1.5} />}
        />
      </Drawer>
    </>
  )
}
