import RoomCard from "./RoomCard";

export default function RoomGrid({ rooms}:any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room:any) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}
