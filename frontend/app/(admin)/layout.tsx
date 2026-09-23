"use client";
import { useAuth } from "@/context/authcontext";
import AdminSidebar from "./admin/components/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { notFound } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, router]);

   if (!user) {
     return null;
   }

   if (user.role !== "admin") {
     notFound();
   }
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 min-h-screen border-r">
        <AdminSidebar />
      </aside>

      <div className="flex-1 bg-background overflow-y-auto">{children}</div>
    </div>
  );
}
