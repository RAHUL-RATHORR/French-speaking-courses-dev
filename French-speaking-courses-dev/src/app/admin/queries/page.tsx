import { requireAuth } from "@/lib/auth/session";
import QueriesManagement from "@/components/admin/QueriesManagement";

export const metadata = {
  title: "Queries Management | Admin Panel",
  description: "Manage contact and course inquiries for French Skill Academy",
};

export default async function QueriesPage() {
  // Check if user is authenticated
  await requireAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Queries Management</h1>
      <p className="text-gray-600 mb-6">
        Manage all contact form submissions and course inquiries in one place.
      </p>
      <QueriesManagement />
    </div>
  );
}
