"use client";

interface FilterOptionsProps {
  currentFilter: "all" | "pending" | "completed";
  onFilterChange: (filter: "all" | "pending" | "completed") => void;
}

export default function FilterOptions({ currentFilter, onFilterChange }: FilterOptionsProps) {
  const options = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value as "all" | "pending" | "completed")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out shadow-sm
            ${currentFilter === option.value
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
