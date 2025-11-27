import { memo } from "react";

interface MobileMenuButtonProps {
  onOpen: () => void;
}

export const MobileMenuButton = memo(function MobileMenuButton({
  onOpen,
}: MobileMenuButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="md:hidden fixed top-3 left-3 sm:top-4 sm:left-4 z-40 p-2 sm:p-2.5 rounded-md bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors shadow-lg"
      aria-label="Open sidebar"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
});
