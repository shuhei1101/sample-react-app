'use client';
import { Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import { SetTaskValue, UseTaskWatch } from "../_schema/taskSchema";
import { TaskStatusSchema } from "../_schema/taskStatusSchema";

/** 引数 */
export type TaskStatusComboboxProps = {
  setValue: SetTaskValue;
  watch: UseTaskWatch;
  taskStatuses: TaskStatusSchema[];
}

export const TaskStatusCombobox = ({ setValue, watch, taskStatuses }: TaskStatusComboboxProps) => {

  /** IDからステータス名を取得する */
  const getStatusName = (id: number) => {
    return taskStatuses.find(s => s.id === id)?.name;
  }

  // コンボボックスの選択肢を初期化する
  const statusOptions = taskStatuses.map((item) => (
    <Combobox.Option value={item.id.toString()} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  // コンボボックスを初期化する
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        console.log(`ステータスは${val}`)
        setValue("statusId", parseInt(val, 10));
        combobox.closeDropdown();
      }}
    >
      {/* コンボボックス入力中の設定 */}
      <Combobox.Target>
        <InputBase
          component="button" type="button"
          pointer rightSection={<Combobox.Chevron />} rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()} className="max-w-40"
        >
          {getStatusName(watch("statusId")) || <Input.Placeholder>-</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{statusOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
