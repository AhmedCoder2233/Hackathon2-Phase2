"use client";

import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading: boolean; // Add loading prop
}

export default function TodoList({ todos, onToggleComplete, onEdit, onDelete, loading }: TodoListProps) {
  if (loading) {
    return (
      <div className="bg-[var(--background)] p-6 sm:p-8 rounded-2xl shadow-xl space-y-4 border border-[var(--gray-200)] animate-pulse">
          {[...Array(5)].map((_, i) => ( // Render 5 skeleton items
              <div key={i} className="flex items-center space-x-4">
                  <div className="h-5 w-5 bg-[var(--gray-200)] rounded-full"></div>
                  <div className="h-4 w-3/4 bg-[var(--gray-200)] rounded"></div>
              </div>
          ))}
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] p-6 sm:p-8 rounded-2xl shadow-xl space-y-4 border border-[var(--gray-200)]">
      {todos.length === 0 ? (
        <div className="py-12 text-center text-[var(--gray-500)]">
          <svg className="mx-auto h-16 w-16 text-[var(--gray-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-[var(--gray-900)]">No tasks</h3>
          <p className="mt-1 text-sm text-[var(--gray-500)]">
            Get started by creating a new task.
          </p>
          <div className="mt-6">
            {/* The AddTaskButton will be rendered in dashboard/page.tsx, so no need to duplicate here */}
          </div>
        </div>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
