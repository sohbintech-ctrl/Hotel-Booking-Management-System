"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { dummyRooms } from "@/lib/rooms";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";
import { getRooms } from "@/api/room";
import RoomGrid from "../components/RoomGrid";
import { useRooms } from "@/app/hooks/useRoom";

// Dummy data — pachi database bata fetch garne (tapaiko logic)

export default function RoomsPage() {
  const { rooms, loading } = useRooms();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Available Rooms</h1>
        <p className="text-muted-foreground">
          Browse all rooms across our branches and find your perfect stay.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search rooms..." className="pl-9" />
        </div>

        <Select>
          <SelectTrigger className="w-full sm:w-180px">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="ktm">Kathmandu</SelectItem>
            <SelectItem value="pkr">Pokhara</SelectItem>
            <SelectItem value="ctw">Chitwan</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full sm:w-180px">
            <SelectValue placeholder="Room Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="deluxe">Deluxe</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rooms Grid */}
     <RoomGrid rooms={rooms} />
    </main>
  );
}
