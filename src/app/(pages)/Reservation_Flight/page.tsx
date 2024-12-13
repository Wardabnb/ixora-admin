"use client";
import { TabsDemo } from "@/components/tabs";
import { TabsFlight } from "@/components/tabsFlight";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [flightsData, setFlightsData] = useState<string | null>(null);

  // Assurez-vous de vérifier si la valeur est `null`
  const savedFlights = localStorage.getItem("reservationFlight");

  if (savedFlights !== null) {
    setFlightsData(savedFlights); // Vous pouvez maintenant assigner la string
  } else {
    setFlightsData(null); // Sinon, définissez-le sur null
  }

  return (
    <div className="mt-5">
      <TabsFlight />
    </div>
  );
};

export default page;
