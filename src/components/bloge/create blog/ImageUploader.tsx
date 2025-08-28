import axios from "axios";
import { API_URLS } from "../../../config/config";

// 🔹 Proper return type (string | null)
export const uploadImageAndGetUrl = async (
  imageFile: File,
  folder: string,
  Token:string,
): Promise<string | null> => {
  if (!imageFile) {
    alert("File not found!");
    return null;
  }

  const formData = new FormData();
  formData.append("folder", folder);
  formData.append("image", imageFile);

  try {
    const response = await axios.post(
      `${API_URLS.addimage}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      const imageUrl: string = response.data.imageUrl;
      return imageUrl;
    }
    return null;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
