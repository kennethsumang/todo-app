"use server";

import AppBreadcrumb from "@/app/_components/misc/AppBreadcrumb";
import CreateTodoContainer from "@/app/_components/todo/CreateTodoContainer";

export default async function TodoNewPage() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <AppBreadcrumb todoId={null} />
      <CreateTodoContainer />
    </div>
  );
}
