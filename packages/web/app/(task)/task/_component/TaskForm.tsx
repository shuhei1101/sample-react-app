'use client';
import { PageLayout } from "@/app/(shared)/(_components)/PageLayout";
import { Button, Checkbox, Combobox, Group, Input, InputBase, Space, Textarea, TextInput, Tooltip, useCombobox } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";

type TaskFormProps = {
  id?: string;
}
const statuses = ['未着手', '進行中', '完了'];

export const TaskForm = ({ id }: TaskFormProps) => {
  const [loading, { toggle }] = useDisclosure();
  const isNew = id == "";

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [value, setValue] = useState<string | null>(null);
  
  const options = statuses.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  
  return (
  
    <PageLayout title="タスク詳細" actionButtons={
      <Button variant="outline">閉じる</Button>
    }>
      <div>
        <div className="flex flex-col gap-2">
          <div>
            <Input.Wrapper label="ID" error="" required>
              {isNew ? 
              <>
                <Input className="max-w-40" />
              </>
              :
              <>
                <p>{id}</p>
              </>
              }
            </Input.Wrapper>
          </div>
          <div>
            <Input.Wrapper label="タスク名" required>
              <Input className="max-w-120" />
            </Input.Wrapper>
          </div>
          <div>
              <Input.Wrapper label="タスク詳細" required>
                <Textarea className="max-w-120" placeholder="500文字以内で入力してください。"
                autosize minRows={4} maxRows={4} />
              </Input.Wrapper>
            
          </div>
          <div>
            <Input.Wrapper label="ステータス" required>
              <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                  setValue(val);
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    className="max-w-40"
                  >
                    {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                  </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
            </Input.Wrapper>
          </div>
          <div>
            <Input.Wrapper label="メール送信" required>
              <Checkbox
                checked={true}
              />
            </Input.Wrapper>
          </div>
        </div>
        <Space h="md" />
        <Group>
          {isNew ? 
          <>
            <Button loading={loading}>保存</Button>
          </>
          :
          <>
            <Button loading={loading} color="red.7" >削除</Button>
            <Button loading={loading}>更新</Button>
          </>
          }
        </Group>

      </div>
    </PageLayout>
  )
}
