"use server";

import TodoDashboardContainer from "../_components/todo/TodoDashboardContainer";
import AppBreadcrumb from "@/app/_components/misc/AppBreadcrumb";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-3">
      <AppBreadcrumb todoId={null} />
      <TodoDashboardContainer />
    </div>
  );
}