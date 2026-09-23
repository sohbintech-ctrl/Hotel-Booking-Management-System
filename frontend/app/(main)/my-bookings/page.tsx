"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, BedDouble } from "lucide-react";

// Dummy data — pachi backend bata logged-in user ko real bookings fetch garne (tapaiko logic)
const dummyBookings = [
  {
    id: "BK10234",
    room: "Deluxe Room 101",
    branch: "Kathmandu Branch",
    checkIn: "2026-09-20",
    checkOut: "2026-09-23",
    guests: 2,
    status: "Confirmed",
  },
  {
    id: "BK10235",
    room: "Standard Room 102",
    branch: "Pokhara Branch",
    checkIn: "2026-10-05",
    checkOut: "2026-10-07",
    guests: 1,
    status: "Pending",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Confirmed: "default",
  Pending: "secondary",
  Cancelled: "destructive",
};

export default function MyBookingsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your room reservations.
        </p>
      </div>

      <div className="space-y-4">
        {dummyBookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{booking.room}</CardTitle>
                <Badge variant={statusVariant[booking.status]}>
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{booking.branch}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {booking.checkIn} → {booking.checkOut}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{booking.guests} guests</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Booking ID: {booking.id}
                </span>
                {booking.status !== "Cancelled" && (
                  <Button variant="outline" size="sm">
                    Cancel Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {dummyBookings.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <BedDouble className="h-10 w-10 mx-auto mb-3" />
          <p>You have no bookings yet.</p>
        </div>
      )}
    </main>
  );
}
