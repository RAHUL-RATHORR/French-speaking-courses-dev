import { requireAuth } from "@/lib/auth/session";
import BlogManagement from "@/components/admin/BlogManagement";

export const metadata = {
  title: "Blog Management | Admin Panel",
  description: "Manage blog posts for French Skill Academy",
};

export default async function BlogPage() {
  // Check if user is authenticated
  await requireAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>
      <BlogManagement />
    </div>
  );
}
