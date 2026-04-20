import { requireAuth } from "@/lib/auth/session";
import TestimonialsManagement from "@/components/admin/TestimonialsManagement";

export const metadata = {
  title: "Testimonials Management | Admin Panel",
  description: "Manage student testimonials for French Skill Academy",
};

export default async function TestimonialsPage() {
  // Check if user is authenticated
  await requireAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Testimonials Management</h1>
      <TestimonialsManagement />
    </div>
  );
}
