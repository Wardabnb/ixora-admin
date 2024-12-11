import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteFlights() {
  return useMutation({
    mutationFn: async (newFlight: { FlightId: string }) => {
      // Pass StayId as a URL parameter
      await axios.delete(`http://localhost:4000/flights/delete`, {
        data: { FlightId: newFlight.FlightId },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch queries, if needed
      // queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  });
}
