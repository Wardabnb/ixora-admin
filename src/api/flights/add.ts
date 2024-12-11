import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useAddFlightsMutation() {
  return useMutation({
    mutationFn: async (newFlight: {
      airplane: string;
      price: number;
      from: string;
      image: string;
      to: string;
      departure: string;
      arrive: string;
    }) => {
      axios.postForm("http://localhost:4000/flights/add", newFlight, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      //	queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  });
}
