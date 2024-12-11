"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddStaysMutation } from "@/api/stays/add";
import { useDeleteStays } from "@/api/stays/delete";

type Props = {};
type ImageDropUploadProps = {
  onImageSelect: (file: File | null) => void;
};
const page = ({ onImageSelect }: ImageDropUploadProps) => {
  const { mutate } = useAddStaysMutation();

  const NameRef = useRef<HTMLInputElement | null>(null);
  const PriceRef = useRef<HTMLInputElement | null>(null);
  const DescriptionRef = useRef<HTMLInputElement | null>(null);
  const ImageRef = useRef<HTMLInputElement | null>(null);
  const RantingRef = useRef<HTMLInputElement | null>(null);
  const LocationRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      onImageSelect(file); // Pass image to parent
    }
  };
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
  const [file, setFile] = useState<File | null>(null);
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  async function Submit() {
    mutate(
      {
        name: NameRef.current?.value!,
        price: parseFloat(PriceRef.current?.value!) || 0,
        location: LocationRef.current?.value!,
        description: DescriptionRef.current?.value! || "",
        // @ts-ignore
        image: file,
        ranting: parseFloat(RantingRef.current?.value!) || 0,
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
  }

  return (
    <div className="p-5">
      <div className="text-center">
        <h1 className="font-extrabold  text-red-700 text-3xl">
          Add Your Stays
        </h1>
        <p className="pt-3 text-gray-600">Add your Stay to your traveller</p>
      </div>

      <div className=" p-5  justify-center items-center  flex   ">
        <div className=" p-5 w-[50%]  flex flex-col gap-8">
          <div className="gap-4">
            <Label htmlFor="name">Name</Label>
            <Input ref={NameRef} id="name" />
          </div>
          <div className=" gap-4">
            <Label htmlFor="location">Localisation</Label>
            <Input ref={LocationRef} id="location" />
          </div>
          <div className=" gap-4">
            <Label htmlFor="description">Description</Label>
            <Input ref={DescriptionRef} id="description" />
          </div>

          <div className="gap-4">
            <Label htmlFor="price">Price</Label>
            <Input ref={PriceRef} id="price" type="number" />
          </div>
          <div className="gap-4">
            <Label htmlFor="ranting">Ranting</Label>
            <Input ref={RantingRef} id="ranting" type="number" />
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-blue-500 transition"
          >
            <input
              ref={ImageRef}
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
          <Button
            className="bg-green-600   w-full text-lg font-bold"
            onClick={() => Submit()}
          >
            Add Stay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
