import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAdmin() {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () =>
      (
        await axios.post("http://localhost:4000/admin/all", {
          password: "123456",
          email: "admin@gmail.com",
        })
      ).data,
  });
}
