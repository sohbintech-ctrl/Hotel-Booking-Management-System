import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BedDouble, CalendarCheck, Users, DollarSign } from "lucide-react";

// Dummy data — pachi database/API bata real data fetch garne (tapaiko logic)
const stats = [
  { icon: CalendarCheck, label: "Total Bookings", value: "128" },
  { icon: BedDouble, label: "Available Rooms", value: "14" },
  { icon: Users, label: "Total Guests", value: "342" },
  { icon: DollarSign, label: "Revenue (This Month)", value: "Rs. 4,52,000" },
];

const recentBookings = [
  {
    id: "BK10234",
    guest: "Sohan Sharma",
    room: "Deluxe Room 101",
    checkIn: "2026-09-20",
    status: "Confirmed",
  },
  {
    id: "BK10235",
    guest: "Anisha Rai",
    room: "Executive Suite 201",
    checkIn: "2026-09-21",
    status: "Pending",
  },
  {
    id: "BK10236",
    guest: "Bikash Thapa",
    room: "Standard Room 102",
    checkIn: "2026-09-22",
    status: "Cancelled",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Confirmed: "default",
  Pending: "secondary",
  Cancelled: "destructive",
};

export default function AdminDashboardPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Overview of bookings and rooms.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s ) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="bg-muted rounded-full p-3">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.id}</TableCell>
                  <TableCell>{b.guest}</TableCell>
                  <TableCell>{b.room}</TableCell>
                  <TableCell>{b.checkIn}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
