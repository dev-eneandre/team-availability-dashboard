import { memo } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClearStorage: () => void;
}

export const Sidebar = memo(function Sidebar({
  isOpen,
  onToggle,
  onClearStorage,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`${
          isOpen ? "w-64" : "w-0 md:w-20"
        } bg-gray-900 border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
          isOpen ? "fixed md:relative" : "fixed md:relative"
        } z-50 h-full`}
      >
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between">
          {isOpen && (
            <h2 className="text-lg sm:text-xl font-bold text-white">Admin</h2>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Dashboard Menu Item */}
        <div className="p-3 sm:p-4">
          <div
            className={`flex items-center ${
              isOpen ? "justify-start" : "justify-center"
            } p-2 sm:p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors cursor-pointer`}
          >
            <svg
              className="w-5 h-5 text-indigo-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {isOpen && (
              <span className="ml-2 sm:ml-3 text-sm sm:text-base text-indigo-400 font-medium">
                Dashboard
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto">
          <div className="flex-1"></div>

          {/* Sidebar Footer */}
          <div className="p-3 sm:p-4 border-t border-gray-800 space-y-3 sm:space-y-4">
            {/* Clear Storage Button */}
            <button
              onClick={onClearStorage}
              className={`w-full flex items-center ${
                isOpen ? "justify-start px-2 sm:px-3" : "justify-center px-2"
              } py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors text-red-400 text-xs sm:text-sm font-medium`}
              title="Clear storage and reset to JSON data"
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {isOpen && <span className="ml-2">Clear Storage</span>}
            </button>

            {/* Andre's Submission */}
            {isOpen && (
              <div className="pt-2">
                <p className="text-xs text-gray-500 text-center">Andre Ene</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
});
