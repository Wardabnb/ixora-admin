"use client";

import { useGetReservationStays } from "@/api/stayReservation/get";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Image from "next/image";
import { useChangeStaysStatus } from "@/api/stayReservation/changeStays";

type Props = {
  stays: {
    user: {
      email: string;
      image: string;
    };
    stays: {
      image: string;
      name: string;
    }[];

    status: string;
  }[];
  status?: "new" | "success";
};
export function TableDemo({ stays, status }: Props) {
  // const { data: stayss } = useGetReservationStays();
  // console.log("reservation", stayss);
  const { mutate } = useChangeStaysStatus();
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px] ">Client</TableHead>
          <TableHead className="w-[300px] text-left">Stays</TableHead>
          <TableHead className="w-[100px]">Floor</TableHead>
          <TableHead className="text-right w-[150px]">Number Persons</TableHead>
          <TableHead className="text-right w-[50px]">Number Room</TableHead>
          <TableHead className="text-right w-[150px] ">Success</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stays?.map((stay: any) => (
          <TableRow key={stay._id}>
            <TableCell className="font-medium w-[300px]">
              {stay.user.email}
            </TableCell>
            <TableCell className="w-[300px] ">
              {stay.stays.map((s: any) => (
                <div
                  key={s._id}
                  className="flex items-center justify-center gap-4"
                >
                  <Image
                    src={s.image}
                    width={100}
                    height={100}
                    alt=""
                    className="w-[50px]"
                  />
                  <p key={s.id} className="font-bold">
                    {s.name}
                  </p>
                </div>
              ))}
            </TableCell>

            <TableCell>{stay.floor}</TableCell>
            <TableCell className="text-center w-[150px]">
              {stay.nbrPerson}
            </TableCell>
            <TableCell className="text-center w-[150px]">
              {stay.nbrRoom}
            </TableCell>
            <TableCell className="text-right w-[150px] ">
              <Button
                onClick={() => {
                  mutate({
                    ReservationId: stay._id,
                    value: "success",
                  });
                  document.location.reload();
                }}
              >
                Success
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
