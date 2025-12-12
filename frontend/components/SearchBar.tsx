"use client";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search tasks by title..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full sm:w-64 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-500 text-gray-800"
    />
  );
}
