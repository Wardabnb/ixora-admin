"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Ensure this code only runs on the client side
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin");
      router.push("/login");
    }
  }, []); // Run once on component mount

  return <div>Redirecting...</div>;
};

export default Page;
