// frontend/types/todo.d.ts

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  due_date?: string;  // ✅ Made optional
  created_at: string; // snake_case to match backend
  updated_at: string; // snake_case to match backend
  completed_at?: string; // Optional and nullable
}

export type CreateTodoData = {
  title: string;
  description?: string; // Optional for creation, not null
  priority: "low" | "medium" | "high";
  due_date?: string; // Optional for creation
};

export type UpdateTodoData = {
  title?: string;
  description?: string | null;
  priority?: "low" | "medium" | "high";
  due_date?: string | null;
  status?: "pending" | "completed";
};