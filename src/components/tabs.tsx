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

export function TabsDemo() {
  const { data: stay, isLoading } = useGetReservationStays(); // Ensure you handle loading states

  if (isLoading) return <p>Loading...</p>;
  if (!stay) return <p>No data available</p>;
  const newStays = stay?.filter((o: any) => o.status === "new");

  console.log("newStays", newStays);

  const successStays = stay?.filter((o: any) => o.status === "success");
  console.log("successStays", successStays);

  return (
    <Tabs defaultValue="new" className="w-full h-screen">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="success">Success</TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <TableDemo stays={newStays} />
      </TabsContent>
      <TabsContent value="success" className="p-5">
        <TableDemo stays={successStays} status="success" />
      </TabsContent>
    </Tabs>
  );
}
