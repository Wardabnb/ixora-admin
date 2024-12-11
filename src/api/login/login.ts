"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
type SignIn = {
  password: string;
  email: string;
};

export function useSignIn() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: SignIn) => {
      try {
        console.log("Payload:", { email, password });
        const response = await axios.post("http://localhost:4000/admin/login", {
          password,
          email,
        });
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected Error:", error);
        }
        throw error;
      }
    },
  });
}
