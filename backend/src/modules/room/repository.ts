import { Room } from "./schema.ts";

//createRoom
export const createRoom = async (data: {
  roomName: string;
roomType: "standard" | "deluxe" | "suite";
  branch: string;
  price: number;
  capacity: number;
  description: string;
   images?: {
    url: string;
    publicId: string;
  }[];
}) => {
  return await Room.create(data);
};

//getRoom
export const getRooms = async () => {
  return await Room.find().sort({ createdAt: -1 });
};

//findRoomById
export const findRoomById = async (id: string) => {
  return await Room.findById(id);
};

//deleteRoom
export const deleteRoom = async (id: string) => {
  return await Room.findByIdAndDelete(id);
};

//updateRoom
export const updateRoom = async (
  id: string,
  data: {
    roomName: string;
    roomType: "standard" | "deluxe" | "suite";
    branch: string;
    price: number;
    capacity: number;
    description: string;
    images?: {
    url: string;
    publicId: string;
  }[];
  }
) => {
  return await Room.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};


