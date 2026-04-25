import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardOverview from "@/components/admin/DashboardOverview";
import { headers } from "next/headers";

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

  // Fetch dashboard data on the server
  let dashboardData = null;
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/admin/dashboard/stats`, {
      headers: await headers(), // Pass cookies for auth
    });
    if (res.ok) {
      dashboardData = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch dashboard data on server:", error);
  }
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <DashboardStats initialData={dashboardData?.stats} />
      
      {/* Overview of blogs, testimonials, and courses */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Content Overview</h2>
        <DashboardOverview initialData={dashboardData?.recent} />
      </div>
    </div>
  );
}
