"use client";

import { useEffect, useState } from "react";
import { TabsFlight } from "@/components/tabsFlight";

type Props = {};

const Page = (props: Props) => {
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

  return (
    <div className="mt-5">
      <TabsFlight />
    </div>
  );
};

export default Page;
