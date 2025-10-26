import { TaskId, TaskFormSchema } from "../_schema/taskSchema";

  const handleDelete = async (id: TaskId) => {
    if (window.confirm('本当に削除しますか？')) {
      console.log('削除処理');
      
    }
  };
