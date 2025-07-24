import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { enhancedImageAPI } from "../utils/enhanceimage";

// import Loading from "./Loading";
import { useState } from "react";

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setloading] = useState();

  const UploadImageHandler = async (file) => {
    // console.log(URL.createObjectURL(file));

    setUploadImage(URL.createObjectURL(file));
    setloading(true);

    try {
      const enhancedURL = await enhancedImageAPI(file);
      setEnhancedImage(enhancedURL);
      setloading(false);
    } catch (error) {
      console.log(error);
      alert("Error while enhancing the image. Please try again later.");
    }
  };

  return (
    <div className="w-full">
      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImagePreview
        Loading={loading}
        uploaded={uploadImage}
        enhanced={enhancedImage?.image}
      />
    </div>
  );
};

export default Home;
