"use server";

import AppBreadcrumb from "@/app/_components/misc/AppBreadcrumb";
import EditTodoContainer from "@/app/_components/todo/EditTodoContainer";

export default async function TodoPage({ params }: { params: Promise<{ todoId: string }> }) {
  const { todoId } = await params;
  return (
    <div className="flex flex-col gap-3 h-full">
      <AppBreadcrumb todoId={todoId} />
      <EditTodoContainer todoId={todoId} />
    </div>
  );
}
