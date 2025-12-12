"use client";

import { Todo } from "../types/todo";

interface StatsCardsProps {
  todos: Todo[];
  loading: boolean; // Add loading prop
}

export default function StatsCards({ todos, loading }: StatsCardsProps) {
  const total = todos.length;
  const pending = todos.filter(todo => todo.status === "pending").length;
  const completed = todos.filter(todo => todo.status === "completed").length;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-pulse">
          {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[var(--gray-200)] h-32 rounded-lg shadow-md flex flex-col items-center justify-center">
                  <div className="h-8 w-2/3 bg-[var(--gray-300)] rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-[var(--gray-300)] rounded"></div>
              </div>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transform hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
        <span className="text-5xl font-extrabold drop-shadow-md">{total}</span>
        <span className="text-xl font-medium mt-2 opacity-90">Total Tasks</span>
      </div>
      <div className="bg-gradient-to-br from-[var(--warning-500)] to-[var(--warning-700)] text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transform hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
        <span className="text-5xl font-extrabold drop-shadow-md">{pending}</span>
        <span className="text-xl font-medium mt-2 opacity-90">Pending Tasks</span>
      </div>
      <div className="bg-gradient-to-br from-[var(--success-500)] to-[var(--success-700)] text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transform hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
        <span className="text-5xl font-extrabold drop-shadow-md">{completed}</span>
        <span className="text-xl font-medium mt-2 opacity-90">Completed Tasks</span>
      </div>
    </div>
  );
}
