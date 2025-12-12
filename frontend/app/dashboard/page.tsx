"use client";

import { useState, useEffect } from "react";
import { useSession } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
} from "../../lib/api";
import { Todo, CreateTodoData, UpdateTodoData } from "../../types/todo";
import Header from "../../components/Header";
import StatsCards from "../../components/StatsCards";
import TodoList from "../../components/TodoList";
import AddTaskButton from "../../components/AddTaskButton";
import TodoFormModal from "../../components/TodoFormModal";
import FilterOptions from "../../components/FilterOptions";
import SearchBar from "../../components/SearchBar";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in");
    }
  }, [session, isPending, router]);


  useEffect(() => {
    if (session?.session?.token) {
      loadTodos();
    }
  }, [session]);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const token = session?.session?.token;
      if (!token) throw new Error("No authentication token found.");
      const data = await getTodos(token);
      setTodos(data);
    } catch (err: any) {
      console.error("Failed to load todos:", err);
      setError(err.message || "Failed to load todos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todoData: CreateTodoData) => {
    try {
      const token = session?.session?.token;
      if (!token) throw new Error("No authentication token found.");
      await createTodo(token, todoData);
      await loadTodos();
    } catch (err: any) {
      console.error("Failed to create todo:", err);
      setError(err.message || "Failed to create todo.");
    }
  };

  const handleUpdateTodo = async (id: string, updates: UpdateTodoData) => {
    try {
      const token = session?.session?.token;
      if (!token) throw new Error("No authentication token found.");
      await updateTodo(token, id, updates);
      await loadTodos();
    } catch (err: any) {
      console.error("Failed to update todo:", err);
      setError(err.message || "Failed to update todo.");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const token = session?.session?.token;
      if (!token) throw new Error("No authentication token found.");
      await deleteTodo(token, id);
      await loadTodos();
    } catch (err: any) {
      console.error("Failed to delete todo:", err);
      setError(err.message || "Failed to delete todo.");
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const token = session?.session?.token;
      if (!token) throw new Error("No authentication token found.");
      await toggleTodoComplete(token, id);
      await loadTodos();
    } catch (err: any) {
      console.error("Failed to toggle todo:", err);
      setError(err.message || "Failed to toggle todo.");
    }
  };

  const handleAddTodoClick = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEditTodoClick = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodo(todoToEdit);
      setIsModalOpen(true);
    }
  };

  const handleSaveTodo = async (todoDataFromModal: Todo | Omit<Todo, "id" | "createdAt">) => {
    if (editingTodo && "id" in todoDataFromModal) {
      const updates: UpdateTodoData = {
        title: todoDataFromModal.title,
        description: todoDataFromModal.description ?? undefined,
        priority: todoDataFromModal.priority,
        due_date: todoDataFromModal.due_date ?? undefined,
        status: todoDataFromModal.status,
      };
      await handleUpdateTodo(editingTodo.id, updates);
    } else {
      const newTodo: CreateTodoData = {
        title: todoDataFromModal.title,
        priority: todoDataFromModal.priority || "medium",
        ...(todoDataFromModal.description !== undefined && todoDataFromModal.description !== null && { description: todoDataFromModal.description }),
        ...(todoDataFromModal.due_date !== undefined && todoDataFromModal.due_date !== null && { due_date: todoDataFromModal.due_date }),
      };
      await handleCreateTodo(newTodo);
    }
    setIsModalOpen(false);
  };

  const handleSearchChange = (query: string) => setSearchQuery(query);

  const filteredAndSearchedTodos = todos.filter((todo) => {
    if (filter === "pending" && todo.status !== "pending") return false;
    if (filter === "completed" && todo.status !== "completed") return false;
    if (
      searchQuery &&
      !todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  if (!mounted || isPending || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-400 animate-ping"></div>
          </div>
          <p className="text-lg text-slate-700 font-medium animate-pulse">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header with Blur Effect */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Error Alert with Modern Design */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 shadow-sm animate-in slide-in-from-top duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Overview
            </span>
          </h2>
          <StatsCards todos={todos} loading={loading} />
        </div>

        {/* Tasks Section with Modern Card */}
        <div className="space-y-6">
          {/* Control Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 bg-gradient-to-b from-indigo-600 to-blue-600 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  Your Tasks
                </h2>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                  {filteredAndSearchedTodos.length} {filteredAndSearchedTodos.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1 sm:flex-none sm:w-64">
                  <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                </div>
                <FilterOptions currentFilter={filter} onFilterChange={setFilter} />
                <AddTaskButton onClick={handleAddTodoClick} />
              </div>
            </div>
          </div>

          {/* Todo List Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6 backdrop-blur-sm min-h-[400px]">
            <TodoList
              todos={filteredAndSearchedTodos}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTodoClick}
              onDelete={handleDeleteTodo}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <TodoFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTodo}
        editingTodo={editingTodo}
      />
    </div>
  );
}