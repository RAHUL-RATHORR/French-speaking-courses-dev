"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  compact?: boolean;
}

export default function LogoutButton({ compact = false }: LogoutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className={`${
        compact
          ? "w-10 h-10 rounded-full flex items-center justify-center"
          : "w-full px-4 py-2"
      } bg-red-600 text-white rounded hover:bg-red-700`}
      title="Logout"
    >
      {compact ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ) : (
        "Logout"
      )}
    </button>
  );
}
