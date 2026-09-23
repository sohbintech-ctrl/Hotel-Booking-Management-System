export const getMe = async () => {
  const response = await fetch("http://localhost:5000/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch user");
  }

  return result;
};

export const updateUser = async (data: {
  name: string;
  number: string;
  email:string;
}) => {
  const response = await fetch(
    "http://localhost:5000/api/users/me",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
};