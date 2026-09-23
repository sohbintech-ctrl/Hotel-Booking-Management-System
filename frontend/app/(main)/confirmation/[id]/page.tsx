import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Calendar, Users, BedDouble, MapPin } from "lucide-react";

// Dummy data — pachi database/API bata booking id ko real data fetch garne (tapaiko logic)
const dummyBooking = {
  id: "BK10234",
  branch: "Kathmandu Branch",
  roomType: "Deluxe Room",
  checkIn: "2026-09-20",
  checkOut: "2026-09-23",
  guests: 2,
  fullName: "Sohan Sharma",
  phone: "9812345678",
  email: "sohan@example.com",
  pricePerNight: 3500,
  nights: 3,
};

export default function ConfirmationPage() {
  const total = dummyBooking.pricePerNight * dummyBooking.nights;

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you, your reservation has been successfully placed.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Booking Summary</span>
            <span className="text-sm font-normal text-muted-foreground">
              #{dummyBooking.id}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{dummyBooking.branch}</span>
          </div>
          <div className="flex items-center gap-3">
            <BedDouble className="h-4 w-4 text-muted-foreground" />
            <span>{dummyBooking.roomType}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {dummyBooking.checkIn} → {dummyBooking.checkOut} (
              {dummyBooking.nights} nights)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{dummyBooking.guests} guests</span>
          </div>

          <Separator />

          <div className="space-y-1 text-sm">
            <p className="font-medium">Guest Details</p>
            <p className="text-muted-foreground">{dummyBooking.fullName}</p>
            <p className="text-muted-foreground">{dummyBooking.phone}</p>
            <p className="text-muted-foreground">{dummyBooking.email}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full">
            Back to Home
          </Button>
        </Link>
        <Button className="flex-1">Download Receipt</Button>
      </div>
    </main>
  );
}
