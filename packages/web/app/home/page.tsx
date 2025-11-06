"use client"
import { RawInformation } from "./_schema/informationSchema"
import { useInformations } from "./_hooks/useInformations"
import { AuthorizedPageLayout } from "../(auth)/_components/AuthorizedPageLayout";
import { DataTable } from "mantine-datatable"
import { Alert } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"

export default function Home() {

  // お知らせ一覧を取得する
  const { fetchedInformations } = useInformations()

  return (
    <AuthorizedPageLayout title="ホーム">
      {/* お知らせ */}
      <Alert variant="light" color="blue" title="お知らせ" icon={<IconInfoCircle />}>
        <p>サンプルアプリのホーム画面です。<br />
        画面左上のメニューから他の画面へ移動できます。<br />
        ログアウトする際は右上のアイコンボタンを押してください。
        </p>
      </Alert>

      <div className="m-5" />
      {/* お知らせ一覧テーブル */}
      <DataTable<RawInformation> 
        withTableBorder 
        highlightOnHover
        noRecordsText=""
        noRecordsIcon={<></>}
        records={fetchedInformations}
        columns={[
          { accessor: 'body', title: '内容', resizable: true },
          { accessor: 'created_at', title: '投稿日', resizable: true ,
            render: (record) => {
              const date = new Date(record.created_at);
              const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
              const yyyy = jst.getFullYear();
              const mm = String(jst.getMonth() + 1).padStart(2, '0');
              const dd = String(jst.getDate()).padStart(2, '0');
              return `${yyyy}/${mm}/${dd}`;
            }
          },
        ]}
      />
    </AuthorizedPageLayout>
  );
}
