import { useState, useEffect, useCallback, useRef } from "react";
import type { TeamMember, AvailabilityStatus } from "../types";
import initialTeamMembersData from "../data/initialTeamMembers.json";

const STORAGE_KEY = "team-members";

// Initial team members data from JSON file
const initialTeamMembers: TeamMember[] = initialTeamMembersData as TeamMember[];

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    // Load from localStorage on initial render
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialTeamMembers;
      }
    }
    return initialTeamMembers;
  });

  // Use ref to track if this is the initial mount
  const isInitialMount = useRef(true);

  // Check for new members in JSON file and merge them
  useEffect(() => {
    setTeamMembers((prev) => {
      const prevIds = new Set(prev.map((m) => m.id));
      const newMembers = initialTeamMembers.filter(
        (member) => !prevIds.has(member.id)
      );

      // If there are new members from the JSON file, merge them with existing data
      if (newMembers.length > 0) {
        return [...prev, ...newMembers];
      }

      return prev;
    });
  }, []); // Run once on mount

  // Debounced save to localStorage
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save to localStorage with debouncing to avoid excessive writes
  useEffect(() => {
    // Skip save on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teamMembers));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }, 300); // 300ms debounce

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [teamMembers]);

  const toggleAvailability = useCallback(
    (id: string, newStatus: AvailabilityStatus) => {
      setTeamMembers((prev) =>
        prev.map((member) => {
          if (member.id !== id) return member;

          const previousStatus = member.status;
          const updatedMember: TeamMember = { ...member, status: newStatus };

          // Rule: If switching from offline to available, store return time
          if (previousStatus === "offline" && newStatus === "available") {
            updatedMember.returnTime = new Date().toLocaleTimeString();
            // Also increment tasks completed when coming back from offline to available
            // (this completes the cycle: busy → offline → available)
            updatedMember.tasksCompleted = (member.tasksCompleted || 0) + 1;
          }

          // Rule: If switching from busy → available (direct transition), increment tasks completed
          if (previousStatus === "busy" && newStatus === "available") {
            updatedMember.tasksCompleted = (member.tasksCompleted || 0) + 1;
          }

          return updatedMember;
        })
      );
    },
    []
  );

  const clearStorage = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    // Reset to initial JSON data
    setTeamMembers(initialTeamMembers);
  }, []);

  return { teamMembers, toggleAvailability, clearStorage };
}
