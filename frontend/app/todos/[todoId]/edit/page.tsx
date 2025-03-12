"use server";

import AppBreadcrumb from "@/app/_components/misc/AppBreadcrumb";
import EditTodoContainer from "@/app/_components/todo/EditTodoContainer";
import TodoFormActions from "@/app/_components/todo/TodoFormActions";

export default async function TodoPage({ params }: { params: Promise<{ todoId: string }> }) {
  const { todoId } = await params;
  return (
    <div className="flex flex-col gap-3 h-full">
      <AppBreadcrumb todoId={todoId} />
      <EditTodoContainer todoId={todoId} />
      <div className="flex flex-row justify-end gap-5">
        <TodoFormActions todoId={todoId} />
      </div>
    </div>
  );
}
