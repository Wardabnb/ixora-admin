import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useEditFlights() {
  return useMutation({
    mutationFn: async (newFlight: {
      FlightId: string;
      airplane: string;
      price: number;
      from: string;
      image: string;
      to: string;
      departure: string;
      arrive: string;
    }) => {
      axios.putForm("http://localhost:4000/flights/Edit", newFlight, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      //	queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  });
}
