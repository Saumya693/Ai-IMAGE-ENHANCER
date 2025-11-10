const API_KEY = "wxfm9wzixlbbejun5";
const BASE_URL = "https://techhk.aoscdn.com";
import axios from "axios";

export const enhancedImageAPI = async (file) => {
  try {
    const taskId = await uploadImage(file);
    console.log("Image Uploaded Successfully , TaskId:", taskId);

    const enhancedImageData = await pollForEnhancedImage(taskId);
    console.log("Enhanced Image Data: ", enhancedImageData);

    console.log(enhancedImageData);
    return enhancedImageData;
  } catch (error) {
    console.error(error); // ✅ log error
    alert("Something went wrong"); // ✅ browser popup
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image");
  }
  console.log("Upload API raw response:", data);

  return data.data.task_id;
};

const fetchEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image! Image not found ");
  }

  return data.data;
};

const pollForEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);
  console.log("Polling result:", result);

  if (result?.state === 4) {
    console.log("Still processing...");

    if (retries >= 20) {
      throw new Error("Max retries reached");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return pollForEnhancedImage(taskId, retries + 1);
  }

  console.log("Enhanced Image URL:", result.output?.image);
  return result;
};
