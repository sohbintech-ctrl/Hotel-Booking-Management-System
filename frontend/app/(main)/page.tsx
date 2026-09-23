import RoomCard from "@/app/(main)/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi, Coffee, Waves, ParkingCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { dummyRooms } from "@/lib/rooms";

// Dummy data — pachi database bata fetch garne (tapaiko logic)

const destinations = [
  { name: "Pokhara", rooms: 12, imageUrl: "" },
  { name: "Kathmandu", rooms: 20, imageUrl: "" },
  { name: "Chitwan", rooms: 8, imageUrl: "" },
  { name: "Nagarkot", rooms: 5, imageUrl: "" },
];

const features = [
  { icon: Wifi, title: "Free WiFi", desc: "High-speed internet in every room" },
  {
    icon: Coffee,
    title: "Breakfast Included",
    desc: "Complimentary breakfast every morning",
  },
  { icon: Waves, title: "Swimming Pool", desc: "Outdoor pool open all day" },
  {
    icon: ParkingCircle,
    title: "Free Parking",
    desc: "Secure on-site parking",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Comfortable rooms, best prices, unforgettable experience.
          </p>

          {/* Search Bar */}
          <div className="bg-background rounded-xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="checkin">Check-in</Label>
              <Input id="checkin" type="date" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="checkout">Check-out</Label>
              <Input id="checkout" type="date" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="guests">Guests</Label>
              <Input id="guests" type="number" min={1} placeholder="2" />
            </div>
            <div className="flex flex-col justify-end">
              <Button className="w-full">Search Rooms</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Rooms */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2">Available Rooms</h2>
        <p className="text-muted-foreground mb-8">
          Browse and book an available room below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Get 20% Off Your First Booking
            </h2>
            <p className="text-primary-foreground/80">
              Use code <span className="font-semibold">FIRST20</span> at
              checkout. Limited time offer.
            </p>
          </div>
          <Button variant="secondary" size="lg">
            Book Now
          </Button>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Popular Destinations
        </h2>
        <p className="text-muted-foreground mb-10 text-center">
          Explore our top hotel locations
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <Card
              key={d.name}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="h-32 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                {d.imageUrl ? (
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Image"
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {d.rooms} rooms available
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Why Stay With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-background rounded-full p-4 shadow-sm">
                    <f.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
