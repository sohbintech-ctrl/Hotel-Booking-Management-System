"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, XCircle, Search } from "lucide-react";
import { useState } from "react";

// Dummy data — pachi database/API bata real bookings fetch garne (tapaiko logic)
const bookings = [
  {
    id: "BK10234",
    guest: "Sohan Sharma",
    room: "Deluxe Room 101",
    checkIn: "2026-09-20",
    checkOut: "2026-09-23",
    guests: 2,
    status: "Confirmed",
  },
  {
    id: "BK10235",
    guest: "Anisha Rai",
    room: "Executive Suite 201",
    checkIn: "2026-09-21",
    checkOut: "2026-09-24",
    guests: 4,
    status: "Pending",
  },
  {
    id: "BK10236",
    guest: "Bikash Thapa",
    room: "Standard Room 102",
    checkIn: "2026-09-22",
    checkOut: "2026-09-23",
    guests: 1,
    status: "Cancelled",
  },
  {
    id: "BK10237",
    guest: "Priya Koirala",
    room: "Deluxe Room 103",
    checkIn: "2026-09-25",
    checkOut: "2026-09-27",
    guests: 2,
    status: "Confirmed",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Confirmed: "default",
  Pending: "secondary",
  Cancelled: "destructive",
};

export default function AdminBookingsPage() {
  const[search,setSearch]=useState("");
  const[status,setStatus]=useState("");
  
    const filteredBookings = bookings.filter((booking: any) => {
      const matchBooking  = booking.guest
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "All Status" || status === ""
          ? true
          : booking.status === status;
          
      return matchBooking && matchStatus;
    });

  return(
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Bookings</h1>
      <p className="text-muted-foreground mb-8">
        Manage all guest reservations.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest name or booking ID..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value ?? "")}
        >
          <SelectTrigger className="sm:w-180px">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.id}</TableCell>
                  <TableCell>{b.guest}</TableCell>
                  <TableCell>{b.room}</TableCell>
                  <TableCell>{b.checkIn}</TableCell>
                  <TableCell>{b.checkOut}</TableCell>
                  <TableCell>{b.guests}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
