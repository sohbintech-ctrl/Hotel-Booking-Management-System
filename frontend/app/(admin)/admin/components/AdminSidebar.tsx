import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/authcontext";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const{logout}=useAuth();
  return (
    <aside className="w-64 border-r bg-muted/40 flex flex-col">
      <div className="h-16 flex items-center px-6 font-semibold text-lg border-b">
        BookIt Admin
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-background hover:shadow-sm transition-colors"
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
