import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type ParamsReservervation = {
  value: string;
  ReservationId: string;
};

export function useChangeFlightStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["change-status-reservation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reservation_stays"] });
    },
    mutationFn: async ({ ReservationId, value }: ParamsReservervation) =>
      (
        await axios.post("http://localhost:4000/reservationFlight/status", {
          ReservationId,
          value,
        })
      ).data,
  });
}
