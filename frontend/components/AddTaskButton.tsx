"use client";

interface AddTaskButtonProps {
  onClick: () => void;
}

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-700)] hover:from-[var(--primary-600)] hover:to-[var(--primary-800)] text-white font-semibold py-2.5 px-5 rounded-full transition duration-300 ease-in-out shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:ring-opacity-50 w-full sm:w-auto"
    >
      <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      Add Task
    </button>
  );
}
