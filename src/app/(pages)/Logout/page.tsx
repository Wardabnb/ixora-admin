"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  useEffect(() => {
    // Cette fonction sera exécutée uniquement côté client
    localStorage.removeItem("admin");
    redirect("/login");
  }, []); // Le tableau vide [] garantit que l'effet ne sera exécuté qu'une seule fois après le rendu initial

  return <div></div>;
};

export default Page;
