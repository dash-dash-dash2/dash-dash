
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dpqkzgd5z/image/upload", // Replace with your Cloudinary cloud name
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // Return the uploaded image URL
};
