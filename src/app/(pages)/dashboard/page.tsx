"use client";

import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar } from "@/components/ui/calendar";

import { Component } from "@/components/chart1";
import { Component1 } from "@/components/chart2";
import { Component3 } from "@/components/chart3";

type Props = {};

const page = (props: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className=" p-5 w-[1280px] flex flex-col gap-5">
      <div className="flex justify-around items-center">
        <Component />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bg-red-100 w-[300px] flex items-center justify-center h-96 gap-6"
          />
        </LocalizationProvider>
        <Component1 />
      </div>
      <Component3 />
    </div>
  );
};

export default page;
