import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CollapsibleSidebar from "@/components/admin/CollapsibleSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getServerSession(authOptions);
  if (!user) {
    return (
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Sidebar Component */}
      <CollapsibleSidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}
