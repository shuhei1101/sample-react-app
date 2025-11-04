import { RawProfile } from "@/app/(auth)/_schema/profileSchema"
import { Button, Table } from "@mantine/core"

const BTN_SIZE = 60

/** プロジェクトメンバーテーブル */
export const ProjectMemberTable = ({members, onUpdateClick, onAddClick}: {
  members: RawProfile[],
  onUpdateClick: () => void,
  onAddClick: () => void,
}) => {

  const rows = members.map((member) => (
    <Table.Tr key={member.user_id}>
      <Table.Td>{member.name}</Table.Td>
      <Table.Td w={BTN_SIZE}>
        <Button size="xs" variant="light" onClick={onUpdateClick}>
          <p>更新</p>
        </Button>
      </Table.Td>
    </Table.Tr>
  ))
  
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          {/* メンバー名 */}
          <Table.Th>氏名</Table.Th>
          {/* 追加ボタン */}
          <Table.Th w={BTN_SIZE}>
            <Button size="xs" variant="light" w={BTN_SIZE} onClick={onAddClick}>
              <p>追加</p>
            </Button>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>

    </Table>

  )
}
