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
import { useChangeFlightStatus } from "@/api/flighReservation/changeStays";

type Props = {
  flights: {
    classe: string;
    user: {
      email: string;
      image: string;
    };
    flights: {
      airplane: string;
      from: string;
      to: string;
      departure: string;
      arrive: string;
    }[];

    status: string;
  }[];
  status?: "new" | "success";
};
export function TableFlight({ flights, status }: Props) {
  // const { data: stayss } = useGetReservationStays();
  // console.log("reservation", stayss);
  console.log("flights", flights);
  const { mutate } = useChangeFlightStatus();

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] ">Client</TableHead>
          <TableHead className="w-[200px] text-left">flights</TableHead>
          <TableHead className="w-[300px]">locations</TableHead>
          <TableHead className="text-center w-[300px]">Times</TableHead>
          <TableHead className="text-center w-[200px]">classes</TableHead>
          <TableHead className="text-center w-[150px] ">Success</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flights?.map((flight: any) => (
          <TableRow key={flight._id}>
            <TableCell className="font-medium w-[200px]">
              {flight.user.email}
            </TableCell>
            <TableCell className="w-[200px] ">
              {flight.flights.map((f: any) => (
                <div key={f._id} className="font-bold">
                  {f.airplane}
                </div>
              ))}
            </TableCell>

            <TableCell>
              {flight.flights.map((f: any) => (
                <div key={f._id}>
                  <p>
                    <span className="font-bold">From: </span>
                    {f.from}
                  </p>
                  <p>
                    <span className="font-bold">To: </span>
                    {f.to}
                  </p>
                </div>
              ))}
            </TableCell>
            <TableCell className="text-center w-[150px]">
              {flight.flights.map((f: any) => (
                <div key={f._id}>
                  <p>
                    <span className="font-bold">Departure: </span>
                    {f.departure}
                  </p>
                  <p>
                    <span className="font-bold">Arrive: </span>
                    {f.arrive}
                  </p>
                </div>
              ))}
            </TableCell>
            <TableCell className="text-center w-[150px]">
              {flight.classe}
            </TableCell>
            <TableCell className="text-right w-[150px] ">
              <Button
                onClick={() => {
                  mutate({
                    ReservationId: flight._id,
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
