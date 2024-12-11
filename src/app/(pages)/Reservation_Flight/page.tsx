import { TabsDemo } from "@/components/tabs";
import { TabsFlight } from "@/components/tabsFlight";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="mt-5">
      <TabsFlight />
    </div>
  );
};

export default page;
