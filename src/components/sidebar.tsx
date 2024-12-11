import { cn } from "@/lib/utils";
import { ChevronDown, House, LogOut, Plane, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

type Props = {};

const Sidebar = (props: Props) => {
  const sidebarElements = [
    {
      name: "Dashboard",
      icon: <House />,
      href: "/dashboard",
      hasCollapasible: false,
    },

    {
      name: "Stays",
      href: "/",
      icon: <Sparkles />,

      hasCollapasible: true,
      children: [
        {
          name: "Add Stays",
          href: "/add_Stays",
        },
        { name: "Stays List", href: "/Stays?page=1" },
      ],
    },
    {
      name: "Flights",
      icon: <Plane />,
      href: "/",
      hasCollapasible: true,
      children: [
        {
          name: "Add Flight",
          href: "/add_Flights",
        },
        { name: "Flights List", href: "/Flights?page=1" },
      ],
    },
    {
      name: "Reservations",
      icon: <Plane />,
      href: "/",
      hasCollapasible: true,
      children: [
        {
          name: "Stays",
          href: "/Reservation_Stays",
        },
        { name: "Flight", href: "/Reservation_Flight" },
      ],
    },
    {
      name: "Logout",
      icon: <LogOut />,
      href: "/Logout",
      hasCollapasible: false,
    },
  ];
  return (
    <div className="flex flex-col w-[400px] items-center  top-0 pb-11 pt-20  gap-7 border-r h-screen bg-[#E8E8E8]">
      <Image
        src="/logo.jpg"
        height={100}
        width={100}
        alt=""
        className="rounded-full "
      />
      <div className="flex flex-col gap-2 w-[300px]">
        {sidebarElements.map((element) => (
          <div className="flex flex-col items-center " key={element.name}>
            {!element.hasCollapasible ? (
              <Link
                href={element.href}
                className="flex  items-center gap-3  w-full p-3 rounded-md"
              >
                {element.icon}
                <span className="font-semibold text-lg">{element.name}</span>
              </Link>
            ) : (
              <Collapsible className="w-full">
                <CollapsibleTrigger
                  asChild
                  className="flex  items-center gap-3  w-full"
                >
                  <Link
                    href={element.children ? "" : element.href}
                    className="flex  items-center gap-3 w-full p-3 rounded-md"
                  >
                    {element.icon}
                    <span className="font-semibold text-lg">
                      {element.name}
                    </span>
                    <ChevronDown className="text-gray-500 ml-auto" />
                  </Link>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-5 py-5">
                  {element.children?.map((child) => {
                    return (
                      <Link
                        href={child.href}
                        className="flex  items-center gap-3  w-full pl-8"
                      >
                        <span className="font-semibold text-lg">
                          {child.name}
                        </span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
