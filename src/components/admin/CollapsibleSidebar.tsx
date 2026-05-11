"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white shadow-md transition-all duration-300 flex flex-col relative`}
    >
      <div className="flex items-center p-4">
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
        {!isCollapsed && (
          <h2 className="ml-2 text-xl font-bold text-gray-800">Admin Panel</h2>
        )}
      </div>

      <nav className="mt-6 flex-grow">
        <div className="px-2 py-2">
          {!isCollapsed && (
            <h3 className="px-2 text-xs uppercase text-gray-500 font-semibold">
              Management
            </h3>
          )}
          <ul className="mt-2">
            <li className="mb-2">
              <Link
                href="/admin/dashboard"
                className={`flex items-center px-2 py-2 rounded hover:bg-blue-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title="Dashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {!isCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/courses"
                className={`flex items-center px-2 py-2 rounded hover:bg-blue-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title="Courses"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.775-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {!isCollapsed && <span className="ml-3">Courses</span>}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/city-pages"
                className={`flex items-center px-2 py-2 rounded hover:bg-blue-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title="City Pages"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {!isCollapsed && <span className="ml-3">City Pages</span>}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/blog"
                className={`flex items-center px-2 py-2 rounded hover:bg-blue-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title="Blog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                {!isCollapsed && <span className="ml-3">Blog</span>}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/testimonials"
                className={`flex items-center px-2 py-2 rounded hover:bg-blue-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title="Testimonials"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                {!isCollapsed && <span className="ml-3">Testimonials</span>}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/queries"
                className={`flex items-center px-2 py-2 rounded hover:bg-blue-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title="Queries"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {!isCollapsed && <span className="ml-3">Queries</span>}
              </Link>
            </li>

          </ul>
        </div>
      </nav>

      <div className={`p-4 ${isCollapsed ? "flex justify-center" : ""}`}>
        <LogoutButton compact={isCollapsed} />
      </div>
    </div>
  );
}
