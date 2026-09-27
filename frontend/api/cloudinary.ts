export const uploadImage = async (image: File) => {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", "hotel_rooms");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/l9tmkj9i/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || "Image upload failed");
  }

    return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
};