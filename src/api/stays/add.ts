import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useAddStaysMutation() {
  return useMutation({
    mutationFn: async (newStay: {
      name: string;
      price: number;
      ranting: number;
      image: string;
      location: string;
      description: string;
    }) => {
      axios.postForm("http://localhost:4000/stays/Add", newStay, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      //	queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  });
}
