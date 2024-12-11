"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetReservationFlight() {
  return useQuery({
    queryKey: ["Reservation_flights"],

    queryFn: async () =>
      (await axios.get("http://localhost:4000/reservationFlight/")).data,
  });
}
