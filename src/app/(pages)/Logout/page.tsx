"use client";

import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  localStorage.removeItem("admin");
  redirect("/login");
  return <div></div>;
};

export default Page;
