'use client';
import { useParams } from "next/navigation";
import { TaskForm } from "../_component/TaskForm";

export default function Page() {
  const params = useParams();

  return (
    <TaskForm id={params.id as string} />
  )
}
