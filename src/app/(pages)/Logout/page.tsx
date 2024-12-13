"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  useEffect(() => {
    // Ensure this code only runs on the client side
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin");
      redirect("/login");
    }
  }, []); // The effect only runs once after the initial render

  return <div></div>;
};

export default Page;
