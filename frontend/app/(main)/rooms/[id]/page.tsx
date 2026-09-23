import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  BedDouble,
  Maximize,
  Wifi,
  Coffee,
  Tv,
  Wind,
} from "lucide-react";
import { dummyRooms } from "@/lib/rooms";
  
export default async function RoomDetailsPage({params}:{params:Promise<{id:string}>}) {
    const {id}=await params;
    //console.log(id);

    const room:any=dummyRooms.find((room)=>room.id===Number(id));
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="sm:col-span-2 h-80 bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
          Main Image
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="h-9.5rem bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            Image
          </div>
          <div className="h-9.5rem bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            Image
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{room.name}</h1>
              <Badge variant={room.available ? "default" : "secondary"}>
                {room.available ? "Available" : "Booked"}
              </Badge>
            </div>
            <p className="text-muted-foreground">{room.branch}</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Up to {room.capacity} guests</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>{room.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="h-4 w-4" />
              <span>{room.size}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{room.description}</p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {room.amenities.map((a: any) => {
                const iconMap = {
                  Wifi,
                  Coffee,
                  Tv,
                  Wind,
                };
                const Icon = iconMap[a.icon as keyof typeof iconMap];

                return (
                  <div
                    key={a.label}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <div className="bg-muted rounded-full p-3">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-sm text-muted-foreground">
                      {a.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Booking Card */}
        <div>
          <div className="border rounded-xl p-6 sticky top-24">
            <p className="text-2xl font-bold mb-1">
              Rs. {room.pricePerNight.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / night
              </span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Inclusive of taxes
            </p>

            <Link
              href={`/booking?roomId=${room.id}&roomType=${room.type}&branch=${room.branch}&price=${room.pricePerNight}&capacity=${room.capacity}`}
            >
              <Button className="w-full" size="lg" disabled={!room.available}>
                {room.available ? "Book This Room" : "Not Available"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
