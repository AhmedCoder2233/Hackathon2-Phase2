"use client";

import { useState, useEffect } from "react";
import { Todo } from "../types/todo";

interface TodoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: Omit<Todo, "id" | "createdAt"> | Todo) => void;
  editingTodo?: Todo | null;
}

export default function TodoFormModal({ isOpen, onClose, onSave, editingTodo }: TodoFormModalProps) {
  // Fix: Always initialize with empty string, never undefined
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || "");
      setDescription(editingTodo.description || "");
      setPriority(editingTodo.priority || "medium");
      setDueDate(editingTodo.due_date || "");
    } else {
      // Reset form if not editing or when modal opens for new task
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
    }
  }, [editingTodo, isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    if (editingTodo) {
      // Edit mode: Update existing todo
      const updatedTodo: Todo = {
        ...editingTodo,
        title: title.trim(),
        description: description.trim(),
        priority,
        due_date: dueDate,
        updated_at: new Date().toISOString(),
      };
      onSave(updatedTodo);
    } else {
      // Create mode: New todo
      const newTodo = {
        title: title.trim(),
        description: description.trim(),
        priority,
        due_date: dueDate,
        status: "pending" as const,
        user_id: "", // This will be set by the backend
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      onSave(newTodo as Omit<Todo, "id" | "createdAt">);
    }
    
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
      <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-lg w-full animate-fade-in-up transform scale-95 duration-300 ease-out border border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-gray-800 leading-tight">
          {editingTodo ? "Edit Task" : "Add New Task"}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl transition duration-200 p-2 rounded-full hover:bg-gray-100"
          title="Close Modal"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm h-28 resize-y"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="priority" className="block text-gray-700 text-sm font-semibold mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Todo["priority"])}
                className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-gray-700 text-sm font-semibold mb-2">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-5 rounded-lg transition duration-300 ease-in-out shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg transition duration-300 ease-in-out shadow-md"
            >
              {editingTodo ? "Save Changes" : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}