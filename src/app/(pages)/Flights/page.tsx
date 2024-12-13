"use client";

import React, { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useGetFlights } from "@/api/flights/get";
import { useEditFlights } from "@/api/flights/edit";
import { useDeleteFlights } from "@/api/flights/delete";

type Props = {};

const page = (props: Props) => {
  const { data: flights } = useGetFlights();

  const AirplaneRef = useRef<HTMLInputElement | null>(null);
  const PriceRef = useRef<HTMLInputElement | null>(null);
  const DepartureRef = useRef<HTMLInputElement | null>(null);
  const ImageRef = useRef<HTMLInputElement | null>(null);
  const ArriveRef = useRef<HTMLInputElement | null>(null);
  const FromRef = useRef<HTMLInputElement | null>(null);
  const ToRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { mutate } = useEditFlights();
  const { mutate: flightD } = useDeleteFlights();

  const FlightEdit = (flight: any) => {
    mutate({
      FlightId: flight._id,
      airplane: AirplaneRef.current?.value!,
      // @ts-ignore
      price: PriceRef.current?.value!,
      departure: DepartureRef.current?.value!,
      // @ts-ignore
      image: file,
      arrive: ArriveRef.current?.value!,
      from: FromRef.current?.value!,
      to: ToRef.current?.value!,
    });
    window.location.reload();
  };

  const handleDelete = (flight: any) => {
    flightD({ FlightId: flight._id });
    window.location.reload();
  };

  return (
    <div className="pt-5">
      <ScrollArea className="h-[700px] w-[77em] rounded-md border m-5">
        <div className="grid grid-cols-3 gap-4 p-10">
          {flights?.map((flight: any) => (
            <div
              className="group relative flex flex-col justify-center border rounded-lg"
              key={flight._id}
            >
              <div className="flex flex-col items-center w-full h-full group-hover:bg-slate-400">
                <img
                  src={flight.image}
                  alt="image"
                  className="w-full border-b pb-3 object-cover bg-gray-300"
                />
                <h1 className="font-bold text-lg text-red-600 text-center p-5">
                  {flight.airplane}
                </h1>
                <div className="flex justify-between px-5 items-center w-full">
                  <p className="text-gray-400">From: {flight.from}</p>
                  <p className="text-gray-400">To: {flight.to}</p>
                </div>
                <div className="flex justify-between px-5 items-center w-full">
                  <p>Departure: {flight.departure}</p>
                  <p>Arrive: {flight.arrive}</p>
                </div>
                <p>{flight.price} DA</p>
                <div>
                  <Dialog>
                    <DialogTrigger className="absolute top-2 right-10 hidden group-hover:block">
                      <Pencil />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Flight</DialogTitle>
                        <DialogDescription>
                          Make changes to your flight here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {/* Input fields for editing flight */}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="airplane">Airplane</Label>
                          <Input
                            id="airplane"
                            defaultValue={flight.airplane}
                            ref={AirplaneRef}
                          />
                        </div>
                        {/* Repeat similar blocks for other fields */}
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => FlightEdit(flight)}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    className="absolute top-2 right-24 hidden group-hover:block"
                    onClick={() => handleDelete(flight)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
