"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BedDouble } from "lucide-react"
import { useRouter } from "next/navigation"

interface Room {
  id: number
  name: string
  type: string
  pricePerNight: number
  capacity: number
  available: boolean
  imageUrl?: string
}

interface RoomCardProps {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
const router=useRouter();

  const handleClick = (id: number) => {
    router.push(`/rooms/${id}`);
  };
  
  return (
    <Card className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={()=>handleClick(room.id)}>
      <div className="h-40 w-full bg-muted flex items-center justify-center">
        {room.imageUrl ? (
          <img 
            src={room.imageUrl}
            alt={room.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <BedDouble className="h-10 w-10 text-muted-foreground" />
        )}
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{room.name}</CardTitle>
          <Badge variant={room.available ? "default" : "secondary"}>
            {room.available ? "Available" : "Booked"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{room.type}</p>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Up to {room.capacity} guests</span>
        </div>
        <p className="text-foreground font-semibold">
          Rs. {room.pricePerNight.toLocaleString()} <span className="font-normal text-muted-foreground">/ night</span>
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full" disabled={!room.available}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}