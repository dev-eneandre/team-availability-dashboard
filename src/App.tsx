import { useState, useMemo, useCallback, useEffect } from "react";
import { useTeamMembers } from "./hooks/useTeamMembers";
import type { AvailabilityStatus, FilterType } from "./types";
import { Sidebar } from "./components/Sidebar";
import { FilterButtons } from "./components/FilterButtons";
import { Summary } from "./components/Summary";
import { TeamMemberCard } from "./components/TeamMemberCard";
import { MobileMenuButton } from "./components/MobileMenuButton";

function App() {
  const { teamMembers, toggleAvailability, clearStorage } = useTeamMembers();
  const [filter, setFilter] = useState<FilterType>("all");
  // Sidebar closed by default, will open on desktop via useEffect
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    // Set initial state
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoized filtered members to avoid recalculation on every render
  const filteredMembers = useMemo(() => {
    if (filter === "all") return teamMembers;
    return teamMembers.filter((member) => member.status === filter);
  }, [teamMembers, filter]);

  // Memoized summary calculations to avoid recalculation on every render
  const summary = useMemo(() => {
    return {
      available: teamMembers.filter((m) => m.status === "available").length,
      busy: teamMembers.filter((m) => m.status === "busy").length,
      offline: teamMembers.filter((m) => m.status === "offline").length,
    };
  }, [teamMembers]);

  // Memoized callbacks to prevent unnecessary re-renders for each function
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const handleToggleAvailability = useCallback(
    (id: string, newStatus: AvailabilityStatus) => {
      toggleAvailability(id, newStatus);
    },
    [toggleAvailability]
  );

  return (
    <div className="flex h-screen bg-slate-800 overflow-hidden">
      {/* Sidebar With Toggle Button And My Watermark*/}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        onClearStorage={clearStorage}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto transition-all duration-300">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {!sidebarOpen && <MobileMenuButton onOpen={handleSidebarOpen} />}

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-indigo-600 px-2">
            Team Availability Dashboard
          </h1>

          <FilterButtons
            currentFilter={filter}
            onFilterChange={handleFilterChange}
          />

          <Summary
            available={summary.available}
            busy={summary.busy}
            offline={summary.offline}
          />

          {/* Team Members List */}
          {/* Instruction:
          1. Render a list of team members, each with:
            a. name
            b. role
            c. availability status ("available" | "busy" | "offline") */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-white">
              Team Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onToggleAvailability={handleToggleAvailability}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
