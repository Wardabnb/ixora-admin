"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddFlightsMutation } from "@/api/flights/add";

const Page = () => {
  const { mutate } = useAddFlightsMutation();

  const AirplaneRef = useRef<HTMLInputElement | null>(null);
  const PriceRef = useRef<HTMLInputElement | null>(null);
  const DepartureRef = useRef<HTMLInputElement | null>(null);
  const ImageRef = useRef<HTMLInputElement | null>(null);
  const FromRef = useRef<HTMLInputElement | null>(null);
  const ToRef = useRef<HTMLInputElement | null>(null);
  const ArriveRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please drop an image file.");
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  async function Submit() {
    mutate(
      {
        airplane: AirplaneRef.current?.value!,
        price: parseFloat(PriceRef.current?.value!) || 0,
        from: FromRef.current?.value!,
        to: ToRef.current?.value! || "",
        // @ts-ignore
        image: file!, // Ensure file is provided
        departure: DepartureRef.current?.value!,
        arrive: ArriveRef.current?.value!,
      },
      {
        onSuccess: () => {
          console.log("Flight added successfully");
          document.location.reload();
        },
        onError: (error) => {
          console.error("Error adding flight:", error);
        },
      }
    );
  }

  return (
    <div className="p-5">
      <div className="text-center">
        <h1 className="font-extrabold text-red-700 text-3xl">
          Add Your Flights
        </h1>
        <p className="pt-3 text-gray-600">Add your flight to your traveler</p>
      </div>

      <div className="justify-center items-center flex">
        <div className="w-[50%] flex flex-col gap-8">
          <div className="gap-4">
            <Label htmlFor="airplane">Airplane</Label>
            <Input ref={AirplaneRef} id="airplane" />
          </div>
          <div className="gap-4">
            <Label htmlFor="from">From</Label>
            <Input ref={FromRef} id="from" />
          </div>
          <div className="gap-4">
            <Label htmlFor="to">To</Label>
            <Input ref={ToRef} id="to" />
          </div>
          <div className="gap-4">
            <Label htmlFor="departure">Departure</Label>
            <Input ref={DepartureRef} id="departure" type="text" />
          </div>
          <div className="gap-4">
            <Label htmlFor="arrive">Arrive</Label>
            <Input ref={ArriveRef} id="arrive" type="text" />
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
          <div className="gap-4">
            <Label htmlFor="price">Price</Label>
            <Input ref={PriceRef} id="price" />
          </div>

          <Button
            className="bg-green-600 w-full text-lg font-bold"
            onClick={Submit}
          >
            Add Flight
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
