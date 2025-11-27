import { memo } from "react";
import type { FilterType } from "../types";

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Only Available" },
  { value: "busy", label: "Only Busy" },
  { value: "offline", label: "Only Offline" },
];

// Instruction:
// 3. Include a filter at the top to show:
// a. All
// b. Only Available
// c. Only Busy
// d. Only Offline
export const FilterButtons = memo(function FilterButtons({
  currentFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-700 flex justify-between items-center">
      <h2 className="text-2xl mb-4 text-white">Filter:</h2>
      <div className="flex gap-4 flex-wrap">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-md border-2 border-indigo-500 font-medium transition-all cursor-pointer text-sm sm:text-base ${
              currentFilter === option.value
                ? "bg-indigo-500 text-white"
                : "bg-transparent text-indigo-500 hover:bg-indigo-500 hover:text-white"
            }`}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
});
