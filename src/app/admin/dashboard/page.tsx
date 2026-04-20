import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardOverview from "@/components/admin/DashboardOverview";

export const metadata = {
  title: "Admin Dashboard | French Skill Academy",
  description: "Admin dashboard for French Skill Academy",
};

export default async function AdminDashboard() {
  // Check if user is authenticated
  const user = await requireAuth();
  
  if (!user) {
    redirect("/admin/login");
  }
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <DashboardStats />
      
      {/* Overview of blogs, testimonials, and courses */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Content Overview</h2>
        <DashboardOverview />
      </div>
    </div>
  );
}
