"use client";

import { signOut, useSession } from "../lib/auth-client";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-[var(--primary-700)] text-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        {/* Placeholder for icon */}
        <span className="text-3xl sm:text-4xl">🚀</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-0">My Dashboard</h1>
      </div>
      {session?.user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm sm:text-base font-medium opacity-90">Welcome, {session.user.email}</span>
          {/* Placeholder for quick actions/notifications */}
          {/* <button className="text-white opacity-70 hover:opacity-100 transition">🔔</button> */}
          <button
            onClick={() => signOut()}
            className="bg-black bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-5 rounded-full transition duration-300 ease-in-out shadow-md"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
