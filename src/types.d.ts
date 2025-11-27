export type AvailabilityStatus = "available" | "busy" | "offline";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: AvailabilityStatus;
  returnTime?: string; // When they switched from offline to available
  tasksCompleted: number; // Counter for tasks completed
}

export type FilterType = "all" | "available" | "busy" | "offline";
