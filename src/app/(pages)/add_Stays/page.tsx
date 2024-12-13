"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddStaysMutation } from "@/api/stays/add";

const Page = () => {
  const { mutate } = useAddStaysMutation();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const ratingRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please drop a valid image file.");
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (
      !nameRef.current?.value ||
      !priceRef.current?.value ||
      !locationRef.current?.value
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    mutate(
      {
        name: nameRef.current.value,
        price: parseFloat(priceRef.current.value) || 0,
        location: locationRef.current.value,
        description: descriptionRef.current?.value || "",
        // @ts-ignore
        image: selectedImage || undefined,
        rating: parseFloat(ratingRef.current?.value || "0"),
      },
      {
        onSuccess: () => {
          console.log("Stay added successfully");
          document.location.reload();
        },
        onError: (error) => {
          console.error("Error adding stay:", error);
        },
      }
    );
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h1 className="font-extrabold text-red-700 text-3xl">Add Your Stays</h1>
        <p className="pt-3 text-gray-600">Add your Stay to your traveller</p>
      </div>

      <div className="p-5 justify-center items-center flex">
        <div className="p-5 w-[50%] flex flex-col gap-8">
          <div className="gap-4">
            <Label htmlFor="name">Name</Label>
            <Input ref={nameRef} id="name" required />
          </div>
          <div className="gap-4">
            <Label htmlFor="location">Location</Label>
            <Input ref={locationRef} id="location" required />
          </div>
          <div className="gap-4">
            <Label htmlFor="description">Description</Label>
            <Input ref={descriptionRef} id="description" />
          </div>
          <div className="gap-4">
            <Label htmlFor="price">Price</Label>
            <Input ref={priceRef} id="price" type="number" required />
          </div>
          <div className="gap-4">
            <Label htmlFor="rating">Rating</Label>
            <Input ref={ratingRef} id="rating" type="number" />
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-blue-500 transition"
          >
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor="image" className="cursor-pointer">
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

          <Button
            className="bg-green-600 w-full text-lg font-bold"
            onClick={handleSubmit}
          >
            Add Stay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
