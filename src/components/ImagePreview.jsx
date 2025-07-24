const ImagePreview = (props) => {
  console.log("Original Image:", props.uploaded);
  console.log("Enhanced Image:", props.enhanced);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {/* Original Image Box */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Original Image
        </h2>
        <div className="w-full h-full">
          {props.uploaded ? (
            <img
              src={props.uploaded}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-200">
              No Image Selected
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Image Box */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
          Enhanced Image
        </h2>
        <div className="w-full h-full">
          {/* Show loader if loading is true */}
          {props.Loading ? (
            <div className="flex items-center justify-center h-80 bg-gray-200">
              <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></div>
            </div>
          ) : props.enhanced ? (
            <img
              src={props.enhanced}
              alt="Enhanced"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-200">
              No Enhanced image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
