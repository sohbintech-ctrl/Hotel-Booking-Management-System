//create Room
export const createRoom = async (data:{
  roomName: string;
  roomType: string;
  branch: string;
  price: number;
  capacity: number;
  description: string;
   images: {
    url: string;
    publicId: string;
  }[];
}) => {
  const response = await fetch("http://localhost:5000/api/rooms", {
    method: "POST",
    credentials: "include",
     headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create room");
  }

  return result;
};

//get Room api
export const getRooms = async () => {
  const response = await fetch("http://localhost:5000/api/rooms", {
    method: "GET",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch rooms");
  }

  return result;
};

//delete Room api
export const deleteRoom = async (id: string) => {
  const response = await fetch(
    `http://localhost:5000/api/rooms/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete room");
  }

  return result;
};

//update Room api
export const updateRoom = async (
  id: string,
  data: {
    roomName: string;
    roomType: string;
    branch: string;
    price: number;
    capacity: number;
    description: string;
     images: {
    url: string;
    publicId: string;
  }[];
  }
) => {
  const response = await fetch(
    `http://localhost:5000/api/rooms/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update room");
  }

  return result;
};

//get Room By Id api showing details of room 
export const getRoomById = async (id: string) => {
  const response = await fetch(
    `http://localhost:5000/api/rooms/${id}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch room");
  }
 
  return result;
};