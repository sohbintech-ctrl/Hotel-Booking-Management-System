"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingData, bookingUpSchema } from "@/lib/validations/booking";


export default function BookingPage() {
  const[branches,setBranches]=useState("");
  const[rooms,setRooms]=useState("");
  const[guests,setGuests]=useState("");
  const[fullName,setFullName]=useState("");
  const[phoneNumber,setPhoneNumber]=useState("");
  const[email,setEmail]=useState("");
  const[specialRequests,setSpecialRequests] = useState("");
  const[checkIn,setCheckIn]=useState("");
  const[checkOut,setCheckOut]=useState("");
  const[errors, setErrors] = useState<Record<string, string>>({});
  const[data,setData]=useState<BookingData | null>(null);

  const searchParams=useSearchParams();

  const branch:string | null=searchParams.get("branch");
  const roomType:string | null=searchParams.get("roomType");
  const capacity:string | null=searchParams.get("capacity");

  useEffect(()=>{
   setBranches(branch || "");
   setRooms(roomType || "");
   setGuests(capacity || "");
  },[branch,roomType,capacity])

  const router=useRouter();
const handleSubmit=(e: React.SubmitEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const value = {
    fullName,
    email,
    phoneNumber,
    checkIn,
    checkOut,
    specialRequests,
    branches,
    rooms,
    guests,
  };
  //console.log(value);
  const result = bookingUpSchema.safeParse(value);
  const fieldErrors: Record<string, string> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0] as string] = issue.message;
    });
    setErrors(fieldErrors);
    return;
  }
  setErrors({});
  setData(result.data); 

  setFullName("");
  setPhoneNumber("");
  setEmail("");
  setCheckIn("");
  setCheckOut("");
  setSpecialRequests("");

  router.push("/");
}
 
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Book Your Room</h1>
        <p className="text-muted-foreground">
          Fill in the details below to reserve your stay.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reservation Details</CardTitle>
          <CardDescription>
            All fields are required to complete booking
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Branch Selection */}
            <div className="space-y-1.5">
              <Label htmlFor="branch">Select Branch</Label>
              <Select value={branches} disabled={!!branches}>
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Choose a branch" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="checkin">Check-in Date</Label>
                <Input
                  id="checkin"
                  type="date"
                  onChange={(e) => setCheckIn(e.target.value)}
                  value={checkIn}
                />
                {errors.checkIn && (
                  <p className="text-destructive">{errors.checkIn}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout">Check-out Date</Label>
                <Input
                  id="checkout"
                  type="date"
                  onChange={(e) => setCheckOut(e.target.value)}
                  value={checkOut}
                />
                {errors.checkOut && (
                  <p className="text-destructive">{errors.checkOut}</p>
                )}
              </div>
            </div>

            {/* Room Type + Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={rooms} disabled={!!rooms}>
                  <SelectTrigger id="roomType">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  placeholder="2"
                  value={guests}
                  disabled={!!guests}
                />
                {errors.guests && (
                  <p className="text-destructive">{errors.guests}</p>
                )}
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  placeholder="John Doe"
                  onChange={(e) => setFullName(e.target.value)}
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-destructive">{errors.fullName}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  placeholder="98XXXXXXXX"
                  type="number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={errors.phoneNumber ? "border-destructive" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-destructive">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Special Requests (optional)</Label>
              <Textarea
                id="notes"
                value={specialRequests}
                placeholder="Any special requirements..."
                rows={3}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className={errors.specialRequests ? "border-destructive" : ""}
              />
              {errors.specialRequests && (
                <p className="text-destructive">{errors.specialRequests}</p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
