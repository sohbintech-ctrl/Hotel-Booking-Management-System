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
import { getRoomById } from "@/api/room";

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  //console.log(id);

  const result = await getRoomById(id);
  const room = result.data;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
  {/* Main Image */}
  <div className="sm:col-span-2 h-80 bg-muted rounded-xl overflow-hidden flex items-center justify-center">
    {room.images?.[0]?.url ? (
      <img
        src={room.images[0].url}
        alt={room.roomName}
        className="h-full w-full object-cover"
      />
    ) : (
      <BedDouble className="h-12 w-12 text-muted-foreground" />
    )}
  </div>

  {/* Side Images */}
  <div className="grid grid-rows-2 gap-4">
    {/* Image 2 */}
    <div className="bg-muted rounded-xl overflow-hidden flex items-center justify-center">
      {room.images?.[1]?.url ? (
        <img
          src={room.images[1].url}
          alt={room.roomName}
          className="h-full w-full object-cover"
        />
      ) : (
        <BedDouble className="h-8 w-8 text-muted-foreground" />
      )}
    </div>

    {/* Image 3 */}
    <div className="bg-muted rounded-xl overflow-hidden flex items-center justify-center">
      {room.images?.[2]?.url ? (
        <img
          src={room.images[2].url}
          alt={room.roomName}
          className="h-full w-full object-cover"
        />
      ) : (
        <BedDouble className="h-8 w-8 text-muted-foreground" />
      )}
    </div>
  </div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{room.roomName}</h1>

              <Badge variant="default">Available</Badge>
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
              <span>{room.roomType}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>

            <p className="text-muted-foreground">{room.description}</p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">Room Information</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Room Type</p>
                <p className="font-medium mt-1">{room.roomType}</p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium mt-1">{room.capacity} guests</p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Branch</p>
                <p className="font-medium mt-1">{room.branch}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Card */}
        <div>
          <div className="border rounded-xl p-6 sticky top-24">
            <p className="text-2xl font-bold mb-1">
              Rs. {Number(room.price).toLocaleString()}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / night
              </span>
            </p>

            <p className="text-sm text-muted-foreground mb-6">
              Inclusive of taxes
            </p>

            <Link
              href={`/booking?roomId=${room._id}&roomType=${room.roomType}&branch=${room.branch}&price=${room.price}&capacity=${room.capacity}`}
            >
              <Button className="w-full" size="lg">
                Book This Room
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
