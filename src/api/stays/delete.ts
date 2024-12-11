import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteStays() {
  return useMutation({
    mutationFn: async (newStay: { StayId: string }) => {
      // Pass StayId as a URL parameter
      await axios.delete(`http://localhost:4000/stays/delete`, {
        data: {
          StayId: newStay.StayId,
        },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch queries, if needed
      // queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  });
}
