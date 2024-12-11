import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useEditStays() {
  return useMutation({
    mutationFn: async (newStay: {
      StayId: string;
      name: string;
      price: number;
      ranting: number;
      image: string;
      location: string;
      description: string;
    }) => {
      axios.putForm("http://localhost:4000/stays/Edit", newStay, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      //	queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  });
}
