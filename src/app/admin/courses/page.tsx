import { requireAuth } from "@/lib/auth/session";
import CoursesManagement from "@/components/admin/CoursesManagement";

export const metadata = {
  title: "Courses Management | Admin Panel",
  description: "Manage courses for French Skill Academy",
};

export default async function CoursesPage() {
  // Check if user is authenticated
  await requireAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Courses Management</h1>
      <CoursesManagement />
    </div>
  );
}
