"use client";
import { useGetAdmin } from "@/api/user/user";
import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const path = usePathname();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
    }
  }, []); // Run only once on component mount

  // Fonction pour formater le chemin d’accès en titre
  const formatPathToTitle = (path: string) => {
    return path
      .split("/")
      .filter(Boolean) // Supprime les parties vides
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" > "); // Optionnel: utilise " > " pour séparer les parties du chemin
  };
  return (
    <div className="flex justify-end  items-center p-5  h-[100px]  w-[1280px]  border-[#E8E8E8] border-b gap-[500px]">
      <p className="font-extrabold text-2xl">
        {formatPathToTitle(path.replace("_", " "))}
      </p>
      <div className="flex items-center gap-10 justify-around">
        <div>
          <Image
            className="rounded-full"
            src={admin?.image}
            alt="profile"
            width={50}
            height={50}
          />
          <p className="font-bold text-sm">{admin?.name}</p>
        </div>

        <Bell className="text-black" />
      </div>
    </div>
  );
};

export default Navbar;
