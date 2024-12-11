"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetReservationStays() {
  return useQuery({
    queryKey: ["Reservation_stays"],

    queryFn: async () =>
      (await axios.get("http://localhost:4000/reservationStay/")).data,
  });
}
