"use client";

import { ComparisonSection } from "@/types/course";

interface ComparisonProps {
  section: ComparisonSection;
}

export default function Comparison({ section }: ComparisonProps) {
  if (!section.rows || section.rows.length === 0) {
    return null;
  }

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <span className="text-gray-600 font-bold text-xl">✔️</span>
      ) : (
        <span className="text-gray-400 text-sm">No</span>
      );
    }
    return <span className={value === "Sometimes" || value === "Rarely" ? "text-gray-400" : "text-gray-600 font-bold"}>{value}</span>;
  };

  return (
    <section id="comparison" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
            {section.headline}
          </h2>

          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-blue-800 uppercase tracking-wider">
                    Our Course
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Traditional Courses
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {section.rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderCell(row.ourCourse)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderCell(row.traditional)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
