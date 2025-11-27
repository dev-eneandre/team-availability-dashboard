import type { AvailabilityStatus } from "../types";

// Instructions 
// 4. Display a summary section showing:
// a. Available: X
// b. Busy: Y
// c. Offline: Z
export const STATUS_COLORS: Record<AvailabilityStatus, string> = {
  available: "bg-green-500",
  busy: "bg-orange-500",
  offline: "bg-gray-500",
};

export const getNextStatus = (
  currentStatus: AvailabilityStatus
): AvailabilityStatus => {
  switch (currentStatus) {
    case "available":
      return "busy";
    case "busy":
      return "offline";
    case "offline":
      return "available";
  }
};
