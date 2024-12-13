import React, { useState } from "react";

type ImageDropUploadProps = {
  onImageSelect: (file: File | null) => void;
};

const ImageDropUpload = ({ onImageSelect }: ImageDropUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      onImageSelect(file); // Pass image to parent
    } else {
      alert("Please drop an image file.");
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-blue-500 transition"
    >
      <input
        id="image"
        className="col-span-3"
        type="file"
        accept="image/*"
        //@ts-ignore
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <label>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
        ) : (
          <p className="text-center text-gray-400">
            Drag & drop an image here or{" "}
            <span className="text-blue-500">browse</span>
          </p>
        )}
      </label>
    </div>
  );
};

export default ImageDropUpload;
