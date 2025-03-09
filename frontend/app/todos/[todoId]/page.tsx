"use server";

import ViewTodoContainer from "@/app/_components/todo/ViewTodoContainer";
import AppBreadcrumb from "@/app/_components/misc/AppBreadcrumb";

export default async function TodoPage({ params }: { params: Promise<{ todoId: string }> }) {
  const { todoId } = await params;
  return (
    <div className="flex flex-col gap-3 h-full">
      <AppBreadcrumb todoId={todoId} />
      <ViewTodoContainer todoId={todoId} />
    </div>
  );
}
