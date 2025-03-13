const statuses = {
  "Not Started": 0,
  "In Progress": 1,
  Completed: 2,
  Cancelled: 3,
};

const priorities = {
  Low: 0,
  High: 1,
  Critical: 2,
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
