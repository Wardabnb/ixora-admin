"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
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
import { useGetFlights } from "@/api/flights/get";
import { useEditFlights } from "@/api/flights/edit";
import { useDeleteFlights } from "@/api/flights/delete";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const { data: flights } = useGetFlights(currentPage);
  const numPages = 10;
  const { mutate } = useEditFlights();
  const { mutate: flightD } = useDeleteFlights();
  const AirplaneRef = useRef<HTMLInputElement | null>(null);
  const PriceRef = useRef<HTMLInputElement | null>(null);
  const DepartureRef = useRef<HTMLInputElement | null>(null);
  const ImageRef = useRef<HTMLInputElement | null>(null);
  const ArriveRef = useRef<HTMLInputElement | null>(null);
  const FromRef = useRef<HTMLInputElement | null>(null);
  const ToRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [flightsData, setFlightsData] = useState<string | null>(null);

  useEffect(() => {
    // Vérification côté client pour accéder à localStorage
    const savedFlights = localStorage.getItem("reservationFlight");

    if (savedFlights !== null) {
      setFlightsData(savedFlights); // Assignez la valeur récupérée de localStorage
    } else {
      setFlightsData(null); // Si rien n'est trouvé, définissez à null
    }
  }, []); // Le tableau vide [] garantit l'exécution seulement après le premier rendu

  function FlightEdit(flight: any) {
    console.log("hello");
    console.log(flight);

    mutate({
      FlightId: flight._id,
      airplane: AirplaneRef.current?.value!,
      // @ts-ignore
      price: PriceRef.current?.value!,
      // @ts-ignore
      departure: DepartureRef.current?.value!,
      // @ts-ignore
      image: file,
      // @ts-ignore
      arrive: ArriveRef.current?.value!,
      // @ts-ignore
      from: FromRef.current?.value!,
      to: ToRef.current?.value!,
    });
    document.location.reload();
  }

  const handleDelete = (flight: any) => {
    flightD({ FlightId: flight._id }); // Appeler la mutation avec l'ID du stay à supprimer
    document.location.reload();
  };
  return (
    <div className="pt-5">
      <ScrollArea className="h-[700px] w-[77em] rounded-md border m-5">
        <div className="grid  grid-cols-3  gap-4 p-10 ">
          {flights?.map((flight: any, index: any) => (
            <div
              className="group  relative flex flex-col justify-center  border rounded-lg "
              key={flight._id}
            >
              <div className="flex flex-col items-center w-full h-full  group-hover:bg-slate-400">
                <Image
                  src={flight.image}
                  height={50}
                  width={50}
                  alt="image"
                  className="w-full border-b pb-3   object-cover bg-gray-300"
                />
                <h1 className="font-bold text-lg text-red-600 text-center p-5">
                  {flight?.airplane}
                </h1>
                <div className="flex justify-between px-5 items-center w-full">
                  <p className="text-gray-400 ">From: {flight?.from}</p>
                  <p className="text-gray-400 ">To: {flight?.to}</p>
                </div>

                <div className="flex justify-between px-5 items-center w-full">
                  <p>departure: {flight?.departure}</p>
                  <p>arrive: {flight?.arrive}</p>
                </div>
                <p>{flight?.price} DA</p>
                <div className="">
                  <Dialog>
                    <DialogTrigger className="absolute top-2 right-10 translate-x-1/2 hidden group-hover:block ">
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="airplane" className="text-right">
                            Airplane
                          </Label>
                          <Input
                            id="airplane"
                            defaultValue={flight.airplane}
                            className="col-span-3"
                            ref={AirplaneRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="from" className="text-right">
                            From
                          </Label>
                          <Input
                            id="from"
                            defaultValue={flight.from}
                            className="col-span-3"
                            ref={FromRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="to" className="text-right">
                            To
                          </Label>
                          <Input
                            id="to"
                            defaultValue={flight.to}
                            className="col-span-3"
                            ref={ToRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="image" className="text-right">
                            image
                          </Label>
                          <Input
                            ref={ImageRef}
                            id="image"
                            className="col-span-3"
                            type="file"
                            accept="image/*"
                            //@ts-ignore
                            onChange={(e) => setFile(e.target.files?.[0])}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            Price
                          </Label>
                          <Input
                            id="price"
                            defaultValue={flight.price}
                            className="col-span-3"
                            ref={PriceRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="departure" className="text-right">
                            Departure
                          </Label>
                          <Input
                            id="departure"
                            defaultValue={flight.departure}
                            className="col-span-3"
                            ref={DepartureRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="arrive" className="text-right">
                            Arrive
                          </Label>
                          <Input
                            id="arrive"
                            defaultValue={flight.arrive}
                            className="col-span-3"
                            ref={ArriveRef}
                          />
                        </div>
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
                    className="absolute top-2 right-24 translate-x-1/2 hidden group-hover:block "
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
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/Flights?page=${Math.max(1, Number(currentPage) - 1)}`}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: numPages }, (_, i) => (
              <PaginationLink href={`/Flights?page=${i + 1}`} key={i}>
                {i + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/Flights?page=${Math.min(
                numPages,
                Number(currentPage) + 1
              )}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default page;
