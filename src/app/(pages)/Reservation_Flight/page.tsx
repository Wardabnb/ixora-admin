"use client";

import { useEffect, useState } from "react";
import { TabsFlight } from "@/components/tabsFlight";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="mt-5">
      <TabsFlight />
    </div>
  );
};

export default Page;
