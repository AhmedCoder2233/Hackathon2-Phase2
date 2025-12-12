import { Todo, CreateTodoData, UpdateTodoData } from "../../frontend/types/todo";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Create todo
export async function createTodo(token: string, data: CreateTodoData): Promise<Todo> {
  console.log("Creating todo with data:", data); // Debug log
  
  const response = await fetch(`${API_BASE}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  // Read response body once
  const responseData = await response.json();
  
  console.log("Response status:", response.status); // Debug log
  console.log("Response data:", responseData); // Debug log
  
  if (!response.ok) {
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/auth/sign-in";
    }
    // Now we can use responseData which is already parsed
    throw new Error(`Failed to create todo: ${responseData.detail || response.statusText}`);
  }
  
  return responseData;
}

// Get all todos
export async function getTodos(token: string): Promise<Todo[]> {
  const response = await fetch(`${API_BASE}/todos/`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/auth/sign-in";
    }
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }
  return response.json();
}

// Update todo
export async function updateTodo(token: string, id: string, data: UpdateTodoData): Promise<Todo> {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/auth/sign-in";
    } else if (response.status === 404) {
      alert("Todo not found");
    }
    throw new Error(`Failed to update todo: ${responseData.detail || response.statusText}`);
  }
  
  return responseData;
}

// Delete todo
export async function deleteTodo(token: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/auth/sign-in";
    } else if (response.status === 404) {
      alert("Todo not found");
    }
    throw new Error(`Failed to delete todo: ${response.statusText}`);
  }
}

// Toggle completion
export async function toggleTodoComplete(token: string, id: string): Promise<Todo> {
  const response = await fetch(`${API_BASE}/todos/${id}/complete`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/auth/sign-in";
    } else if (response.status === 404) {
      alert("Todo not found");
    }
    throw new Error(`Failed to toggle todo: ${responseData.detail || response.statusText}`);
  }
  
  return responseData;
}