const CustomFileInput = ({ handleImageChange, imagePreviews }: any) => {
  return (
    <div className="py-2">
      <div className="w-full border rounded border-dashed border-primary p-4 text-center bg-white">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
        <label
          htmlFor="image"
          className="cursor-pointer text-primary hover:underline"
        >
          {imagePreviews.length > 0 ? (
            <span className="font-medium">
              {imagePreviews.length} files selected
            </span>
          ) : (
            "Click to upload files"
          )}
        </label>
        <p className="text-sm text-gray-500 mt-2">
          Supports PNG, JPG, JPEG files.
        </p>
      </div>
      {imagePreviews.length > 0 && (
        <div className="flex gap-5 my-5 flex-wrap">
          {imagePreviews.map((imageDataUrl: any) => (
            <div
              key={imageDataUrl}
              className="relative w-20 h-14 object-cover rounded border border-dashed border-primary p-1"
            >
              <img
                alt="item"
                className="h-full w-full object-cover object-center rounded-md"
                src={imageDataUrl}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;
