"use client";

import { priorityValueToLabel } from "@/app/_constants/todo.constant";
import { convertUtcToUserTimezone, isAfterNow, getUtcDate, diffFromNowInHours } from "@/app/_libs/date";

interface Props {
  date: Date|string;
  priority: number;
  status: number;
  title: string;
}

const TodoDashboardDueDate: React.FC<Props> = ({ date, priority, status, title }) => {
  const priorityStr = priorityValueToLabel[priority.toString()] as "Low"|"High"|"Critical";
  const hoursThreshold: Record<"Low"|"High"|"Critical", number|null> = {
    Low: null,
    High: 24,
    Critical: 48,
  };
  const convertedDate = convertUtcToUserTimezone(date);
  const diffInHours = diffFromNowInHours(convertedDate);
  const isNearingDue = priority === 0 ? false : diffInHours <= (hoursThreshold[priorityStr] as number);
  const isOverdue = isAfterNow(convertedDate);

  if (isOverdue && status !== 2) {
    console.log(`Title: ${title}`);
    console.log(`Converted Date: ${convertedDate}`);
    console.log(`Now: ${convertUtcToUserTimezone(getUtcDate())}`);
    return (
      <div className="flex flex-col gap-1" style={{ color: "#CA0061" }}>
        <span>{convertedDate}</span>
        <span>Overdue</span>
      </div>
    );
  }

  if (isNearingDue && status !== 2) {
    return (
      <div className="flex flex-col gap-1" style={{ color: "#009292" }}>
        <span>{convertedDate}</span>
        <span>In {diffInHours} hours</span>
      </div>
    );
  }

  return <>{convertedDate}</>;
};

export default TodoDashboardDueDate;
