import { memo, useCallback } from "react";
import type { TeamMember, AvailabilityStatus } from "../types";
import { STATUS_COLORS, getNextStatus } from "../utils/statusUtils";

interface TeamMemberCardProps {
  member: TeamMember;
  onToggleAvailability: (id: string, newStatus: AvailabilityStatus) => void;
}

export const TeamMemberCard = memo(function TeamMemberCard({
  member,
  onToggleAvailability,
}: TeamMemberCardProps) {
  const handleToggle = useCallback(() => {
    onToggleAvailability(member.id, getNextStatus(member.status));
  }, [member.id, member.status, onToggleAvailability]);

  const nextStatus = getNextStatus(member.status);

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-white">{member.name}</h3>
          <span
            className={`${
              STATUS_COLORS[member.status]
            } px-3 py-1 rounded-full text-xs font-bold text-white uppercase`}
          >
            {member.status}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-2">{member.role}</p>
        {member.returnTime && (
          <p className="text-gray-500 text-xs mb-1">
            Returned at: {member.returnTime}
          </p>
        )}
          <p className="text-gray-500 text-xs mb-1">
            Tasks completed: {member.tasksCompleted}
          </p>

      </div>
      {/* Instruction:
        2. Allow the user to toggle each team member's availability by clicking a button.
      */}
      <button
        className="w-full py-3 rounded-md border border-indigo-500 bg-transparent text-indigo-500 font-medium transition-all hover:bg-indigo-500 hover:text-white mt-4"
        onClick={handleToggle}
      >
        Switch to {nextStatus}
      </button>
    </div>
  );
});
