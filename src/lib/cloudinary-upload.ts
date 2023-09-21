const cloudinaryUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string);
  formData.append("folder", "pinterest-clone");
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
  );

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL as string, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};

export default cloudinaryUpload;
