"use client";

import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void; // Placeholder for later
  onDelete: (id: string) => void; // Placeholder for later
}

export default function TodoItem({ todo, onToggleComplete, onEdit, onDelete }: TodoItemProps) {
  const getPriorityColor = (priority: Todo["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-[var(--success-500)]";
      case "medium":
        return "bg-[var(--warning-500)]";
      case "high":
        return "bg-[var(--danger-500)]";
      default:
        return "bg-[var(--gray-500)]"; // Fallback to gray if somehow invalid
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-lg shadow-sm border border-[var(--gray-200)] transition-all duration-300 ease-in-out hover:shadow-md
      ${todo.status === "completed" ? "bg-[var(--gray-100)] opacity-80" : "bg-[var(--background)] hover:border-[var(--primary-300)]"}
    `}>
      <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
        <input
          type="checkbox"
          checked={todo.status === "completed"}
          onChange={() => onToggleComplete(todo.id)}
          className="form-checkbox h-5 w-5 text-[var(--primary-600)] rounded-full focus:ring-2 focus:ring-[var(--primary-500)] cursor-pointer transition duration-150 ease-in-out"
        />
        <div className="ml-3 flex-1">
          <h3 className={`text-lg font-semibold text-[var(--gray-800)] ${todo.status === "completed" ? "line-through text-[var(--gray-500)]" : ""}`}>
            {todo.title}
          </h3>
          <p className="text-sm text-[var(--gray-600)] mt-1">{todo.description}</p>
          <div className="flex flex-wrap items-center text-xs text-[var(--gray-500)] mt-2 space-x-3">
            <span className={`${getPriorityColor(todo.priority)} text-white px-2.5 py-0.5 rounded-full font-medium shadow-sm`}>
              {todo.priority}
            </span>
            {todo.due_date && <span>Due: {todo.due_date}</span>}
          </div>
        </div>
      </div>
      <div className="flex space-x-2 sm:ml-4 mt-3 sm:mt-0">
        <button
          onClick={() => onEdit(todo.id)}
          className="p-2 rounded-full text-[var(--primary-600)] hover:bg-[var(--primary-100)] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
          title="Edit Task"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 rounded-full text-[var(--danger-600)] hover:bg-[var(--danger-100)] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--danger-500)]"
          title="Delete Task"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
