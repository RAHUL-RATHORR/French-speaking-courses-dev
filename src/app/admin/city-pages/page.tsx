import { requireAuth } from "@/lib/auth/session";
import CityPageManagement from "@/components/admin/CityPageManagement";

export const metadata = {
  title: "City Page Management | Admin Panel",
  description: "Manage local SEO city pages for French Skill Academy",
};

export default async function CityPagesAdminPage() {
  // Check if user is authenticated
  await requireAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">City Page Management (Local SEO)</h1>
      <CityPageManagement />
    </div>
  );
}
