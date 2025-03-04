const statuses = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  CANCELLED: 3,
};

const priorities = {
  LOW: 0,
  HIGH: 1,
  CRITICAL: 2,
};

const statusValueToLabel: Record<string, string> = {
  "0": "Not Started",
  "1": "In Progress",
  "2": "Completed",
  "3": "Cancelled",
};

const priorityValueToLabel: Record<string, string> = {
  "0": "Low",
  "1": "High",
  "2": "Critical",
};

export { statuses, priorities, statusValueToLabel, priorityValueToLabel };
