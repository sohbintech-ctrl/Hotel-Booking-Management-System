import cloudinary from "../config/cloudinary.ts";
import { createRoom, deleteRoom, findRoomById, getRooms, updateRoom } from "./repository.ts";
//createRoomService
export const createRoomService = async (data: {
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
  if (
    !data.roomName ||
    !data.roomType ||
    !data.branch ||
    !data.price ||
    !data.capacity ||
    !data.description
  ) {
    throw new Error("All room fields are required");
  }

  const room = await createRoom(data);

  return room;
};

//getRoomService
export const getRoomsService = async () => {
  const rooms = await getRooms();

  return rooms;
};

//deleteRoomService
export const deleteRoomService = async (id: string) => {
  const room = await findRoomById(id);

  if (!room) {
    throw new Error("Room not found");
  }

    if (room.images && room.images.length > 0) {
    for (const image of room.images) {
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }
  }
  
  await deleteRoom(id);

  return room;
};

//updateRoomSerivice
export const updateRoomService = async (
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
  const room = await findRoomById(id);

  if (!room) {
    throw new Error("Room not found");
  }

  // New image come and old image delete
  
  if (data.images && room.images) {
    const oldImages = room.images.filter(
      (oldImage: any) =>
        !data.images?.some(
          (newImage) =>
            newImage.publicId === oldImage.publicId
        )
    );

    for (const image of oldImages) {
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }
  }

  const updatedRoom = await updateRoom(id, data);

  return updatedRoom;
};

//getRoomById details
export const getRoomByIdService = async (id: string) => {
  const room = await findRoomById(id);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};