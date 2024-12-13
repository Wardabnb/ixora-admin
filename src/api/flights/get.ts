import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetFlights() {
  return useQuery({
    queryKey: ["flights"],

    queryFn: async () =>
      (await axios.get("http://localhost:4000/flights")).data,
  });
}
