"use server";

import AppBreadcrumb from "@/app/_components/misc/AppBreadcrumb";
import EditTodoContainer from "@/app/_components/todo/EditTodoContainer";
import TodoFormContextProvider from "@/app/_providers/TodoFormContextProvider";

export default async function TodoPage({ params }: { params: Promise<{ todoId: string }> }) {
  const { todoId } = await params;
  return (
    <div className="flex flex-col gap-3 h-full">
      <AppBreadcrumb todoId={todoId} />
      <TodoFormContextProvider>
        <EditTodoContainer todoId={todoId} />
      </TodoFormContextProvider>
    </div>
  );
}
