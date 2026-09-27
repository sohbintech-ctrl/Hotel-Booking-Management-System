"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BedDouble } from "lucide-react";
import { useRouter } from "next/navigation";

interface Room {
  _id: string;
  roomName: string;
  roomType: string;
  branch: string;
  price: number;
  capacity: number;
  description: string;
  images?: {
    url: string;
    publicId: string;
  }[];
}

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/rooms/${id}`);
  };

  return (
    <Card
      className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleClick(room._id)}
    >
      {/* Room Image */}
      <div className="h-40 w-full bg-muted flex items-center justify-center">
        {room.images?.[0]?.url ? (
          <img
            src={room.images[0].url}
            alt={room.roomName}
            className="h-full w-full object-cover"
          />
        ) : (
          <BedDouble className="h-10 w-10 text-muted-foreground" />
        )}
      </div>

      {/* Room Header */}
      <CardHeader>
        <CardTitle className="text-lg">{room.roomName}</CardTitle>
      </CardHeader>

      {/* Room Details */}
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{room.roomType}</p>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Up to {room.capacity} guests</span>
        </div>

        <p>{room.branch}</p>

        <p className="text-foreground font-semibold">
          Rs. {room.price}
          <span className="font-normal text-muted-foreground"> / night</span>
        </p>
      </CardContent>

      {/* Button */}
      <CardFooter>
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(room._id);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
