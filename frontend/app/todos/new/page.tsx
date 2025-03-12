"use server";

import AppBreadcrumb from "@/app/_components/misc/AppBreadcrumb";
import CreateTodoContainer from "@/app/_components/todo/CreateTodoContainer";
import TodoFormActions from "@/app/_components/todo/TodoFormActions";

export default async function TodoNewPage() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <AppBreadcrumb todoId={null} />
      <CreateTodoContainer />
      <div className="flex flex-row justify-end gap-5">
        <TodoFormActions />
      </div>
    </div>
  );
}
