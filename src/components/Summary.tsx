import { memo } from "react";

interface SummaryProps {
  available: number;
  busy: number;
  offline: number;
}

export const Summary = memo(function Summary({
  available,
  busy,
  offline,
}: SummaryProps) {
  return (
    <div className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-700 flex justify-between items-center">
      <h2 className="text-2xl mb-4 text-white">Summary</h2>
      <div className="flex gap-8 flex-wrap">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-400">Available:</span>
          <span className="text-3xl font-bold text-indigo-500">
            {available}
          </span>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm text-gray-400">Busy:</span>
          <span className="text-2xl sm:text-3xl font-bold text-indigo-500">
            {busy}
          </span>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm text-gray-400">Offline:</span>
          <span className="text-2xl sm:text-3xl font-bold text-indigo-500">
            {offline}
          </span>
        </div>
      </div>
    </div>
  );
});
