"use client";
import { useGetStays } from "@/api/stays/get";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import { useEditStays } from "@/api/stays/edit";
import { useDeleteStays } from "@/api/stays/delete";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const { data: stays } = useGetStays(currentPage);

  const numPages = 10;
  const { mutate } = useEditStays();
  const { mutate: stayD } = useDeleteStays();
  const NameRef = useRef<HTMLInputElement | null>(null);
  const PriceRef = useRef<HTMLInputElement | null>(null);
  const DescriptionRef = useRef<HTMLInputElement | null>(null);
  const ImageRef = useRef<HTMLInputElement | null>(null);
  const RantingRef = useRef<HTMLInputElement | null>(null);
  const LocationRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function EditStay(stay: any) {
    console.log("hello");

    mutate({
      StayId: stay._id,
      name: NameRef.current?.value!,
      // @ts-ignore
      price: PriceRef.current?.value!,
      // @ts-ignore
      description: DescriptionRef.current?.value!,
      // @ts-ignore
      image: file,
      // @ts-ignore
      ranting: RantingRef.current?.value!,
      // @ts-ignore
      location: LocationRef.current?.value!,
    });
    console.log("name", NameRef.current?.value);
    // console.log("price", PriceRef.current?.value)
    // console.log("stock", StockRef.current?.value)
    // console.log("image", ImageRef.current?.value)
    document.location.reload();
  }
  const handleDelete = (stay: any) => {
    stayD({ StayId: stay._id }); // Appeler la mutation avec l'ID du stay à supprimer
    document.location.reload();
  };
  return (
    <div className="pt-5">
      <ScrollArea className="h-[700px] w-[77em] rounded-md border m-5">
        <div className="grid  grid-cols-3  gap-4 p-10 ">
          {stays?.map((stay: any, index: any) => (
            <div
              className="group  relative flex flex-col justify-center  border rounded-lg "
              key={stay._id}
            >
              <div className="flex flex-col items-center w-full h-full  group-hover:bg-slate-400">
                <Image
                  src={stay.image}
                  height={50}
                  width={100}
                  alt="Stay image"
                  className="w-full border-b bg-gray-300 group-hover:bg-slate-400 h-[50%]"
                />

                <h1 className="font-bold text-lg text-red-600 text-center p-5">
                  {stay?.name}
                </h1>
                <p className="text-gray-400 ">{stay?.location}</p>
                <p className="text-center p-5">{stay?.description}</p>
                <div className="flex justify-center gap-11 items-center w-full">
                  <p>{stay?.price}DA</p>
                  <p>{stay?.ranting}/10</p>
                </div>
                <div className="">
                  <Dialog>
                    <DialogTrigger className="absolute top-2 right-10 translate-x-1/2 hidden group-hover:block bg-white p-2 rounded">
                      <Pencil />
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Stay</DialogTitle>
                        <DialogDescription>
                          Make changes to your stay here. Click save when you're
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue={stay.name}
                            className="col-span-3"
                            ref={NameRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="locatisation" className="text-right">
                            Location
                          </Label>
                          <Input
                            id={stay.location}
                            defaultValue="@peduarte"
                            className="col-span-3"
                            ref={LocationRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input
                            id="description"
                            defaultValue={stay.description}
                            className="col-span-3"
                            ref={DescriptionRef}
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
                            defaultValue={stay.price}
                            className="col-span-3"
                            ref={PriceRef}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="ranting" className="text-right">
                            Ranting
                          </Label>
                          <Input
                            id="ranting"
                            defaultValue={stay.ranting}
                            className="col-span-3"
                            ref={RantingRef}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => EditStay(stay)}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="absolute top-2 right-24 translate-x-1/2 hidden group-hover:block "
                    onClick={() => handleDelete(stay)}
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
              href={`/Stays?page=${Math.max(1, Number(currentPage) - 1)}`}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: numPages }, (_, i) => (
              <PaginationLink href={`/Stays?page=${i + 1}`} key={i}>
                {i + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/stays?page=${Math.min(
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
