"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

// Define types
interface Query {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  type: "CONTACT" | "COURSE_INQUIRY";
  courseId?: string;
  courseTitle?: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function QueriesManagement() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [noteText, setNoteText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Fetch queries on component mount
  useEffect(() => {
    fetchQueries();
  }, []);

  // Function to fetch all queries
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/queries");
      if (!response.ok) {
        throw new Error("Failed to fetch queries");
      }
      const data = await response.json();
      setQueries(data);
      setError("");
    } catch (err) {
      setError("Error loading queries. Please try again.");
      console.error("Error fetching queries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to update query status
  const updateQueryStatus = async (id: string, status: "NEW" | "IN_PROGRESS" | "RESOLVED") => {
    try {
      const response = await fetch(`/api/admin/queries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update query status");
      }

      // Update local state
      setQueries(queries.map(q => q.id === id ? { ...q, status } : q));
      if (selectedQuery && selectedQuery.id === id) {
        setSelectedQuery({ ...selectedQuery, status });
      }
    } catch (err) {
      setError("Failed to update status. Please try again.");
      console.error("Error updating query status:", err);
    }
  };

  // Function to add a note to a query
  const addNote = async (id: string) => {
    if (!noteText.trim()) return;

    try {
      const response = await fetch(`/api/admin/queries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: noteText }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      // Update local state
      const updatedQueries = queries.map(q => 
        q.id === id ? { ...q, notes: noteText } : q
      );
      setQueries(updatedQueries);
      
      if (selectedQuery && selectedQuery.id === id) {
        setSelectedQuery({ ...selectedQuery, notes: noteText });
      }
      
      setNoteText("");
    } catch (err) {
      setError("Failed to add note. Please try again.");
      console.error("Error adding note:", err);
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
  };

  // Filter queries based on status and type
  const filteredQueries = queries.filter((query) => {
    const statusMatch = statusFilter === "all" || query.status === statusFilter;
    const typeMatch = typeFilter === "all" || query.type === typeFilter;
    return statusMatch && typeMatch;
  });

  // Get query details
  const showQueryDetails = (query: Query) => {
    setSelectedQuery(query);
    setNoteText(query.notes || "");
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 border-b border-red-100">
          {error}
        </div>
      )}

      <div className="p-6 bg-slate-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">All Queries</h2>
          <div className="flex flex-wrap gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Types</option>
              <option value="CONTACT">Contact Queries</option>
              <option value="COURSE_INQUIRY">Course Inquiries</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <svg
              className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p>Loading queries...</p>
          </div>
        ) : filteredQueries.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-500 text-lg">No queries found</p>
            {(statusFilter !== "all" || typeFilter !== "all") && (
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
                className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* List of queries */}
            <div className="lg:w-2/5 bg-white rounded-lg shadow overflow-y-auto max-h-[600px]">
              <div className="divide-y divide-gray-200">
                {filteredQueries.map((query) => (
                  <div
                    key={query.id}
                    className={`p-4 cursor-pointer hover:bg-slate-50 ${
                      selectedQuery?.id === query.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => showQueryDetails(query)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {query.name}
                        </h3>
                        <p className="text-sm text-gray-500">{query.email}</p>
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            query.status === "NEW"
                              ? "bg-yellow-100 text-yellow-800"
                              : query.status === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {query.status === "NEW"
                            ? "New"
                            : query.status === "IN_PROGRESS"
                            ? "In Progress"
                            : "Resolved"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          query.type === "CONTACT"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {query.type === "CONTACT" ? "Contact" : "Course"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(query.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Query details */}
            <div className="lg:w-3/5 bg-white rounded-lg shadow p-6">
              {selectedQuery ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedQuery.name}
                      </h2>
                      <p className="text-gray-600">{selectedQuery.email}</p>
                      {selectedQuery.phone && (
                        <p className="text-gray-600">{selectedQuery.phone}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedQuery.status === "NEW"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                        onClick={() => updateQueryStatus(selectedQuery.id, "NEW")}
                      >
                        New
                      </button>
                      <button
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedQuery.status === "IN_PROGRESS"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                        onClick={() => updateQueryStatus(selectedQuery.id, "IN_PROGRESS")}
                      >
                        In Progress
                      </button>
                      <button
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedQuery.status === "RESOLVED"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                        onClick={() => updateQueryStatus(selectedQuery.id, "RESOLVED")}
                      >
                        Resolved
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex gap-3 mb-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          selectedQuery.type === "CONTACT"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {selectedQuery.type === "CONTACT" ? "Contact Query" : "Course Inquiry"}
                      </span>
                      <span className="text-gray-500">
                        Received: {formatDate(selectedQuery.createdAt)}
                      </span>
                    </div>

                    {selectedQuery.type === "COURSE_INQUIRY" && selectedQuery.courseTitle && (
                      <div className="bg-blue-50 p-3 rounded-md mb-4">
                        <p className="font-medium text-blue-800">Course: {selectedQuery.courseTitle}</p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-md mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Message:</h3>
                      <p className="whitespace-pre-line">{selectedQuery.message}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-medium mb-3">Notes</h3>
                    <div className="flex gap-3 mb-4">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Add notes about this query..."
                      />
                      <button
                        onClick={() => addNote(selectedQuery.id)}
                        disabled={!noteText.trim()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-300"
                      >
                        Save
                      </button>
                    </div>
                    {selectedQuery.notes && (
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="whitespace-pre-line">{selectedQuery.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p className="text-gray-500">Select a query to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
