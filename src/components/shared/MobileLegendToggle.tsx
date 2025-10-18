'use client';


interface MobileLegendToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function MobileLegendToggle({ isVisible, onToggle }: MobileLegendToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        absolute top-4 right-4 z-[1000]
        w-12 h-12 rounded-full
        bg-blue-600 hover:bg-blue-700
        text-white shadow-lg
        flex items-center justify-center
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isVisible ? 'bg-blue-700 ring-2 ring-blue-300' : ''}
      `}
      aria-label={isVisible ? "Hide map legend" : "Show map legend"}
    >
      <svg
        className={`w-6 h-6 transition-transform duration-200 ${
          isVisible ? 'rotate-180' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}