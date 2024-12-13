"use client";

import { redirect } from "next/navigation";

const Page = () => {
  // Ensure this code only runs on the client side

  localStorage.removeItem("admin");
  redirect("/login");

  // The effect only runs once after the initial render

  return <div></div>;
};

export default Page;
