"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableDemo } from "./table";
import { useGetReservationStays } from "@/api/stayReservation/get";
import { useGetReservationFlight } from "@/api/flighReservation/get";
import { TableFlight } from "./tableFlight";

export function TabsFlight() {
  const { data: flight, isLoading } = useGetReservationFlight(); // Ensure you handle loading states

  if (isLoading) return <p>Loading...</p>;
  if (!flight) return <p>No data available</p>;
  const newFlights = flight?.filter((o: any) => o.status === "new");

  console.log("newStays", newFlights);

  const successFlights = flight?.filter((o: any) => o.status === "success");
  console.log("successStays", successFlights);

  return (
    <Tabs defaultValue="new" className="w-full h-screen">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="success">Success</TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <TableFlight flights={newFlights} />
      </TabsContent>
      <TabsContent value="success" className="p-5">
        <TableFlight flights={successFlights} status="success" />
      </TabsContent>
    </Tabs>
  );
}
