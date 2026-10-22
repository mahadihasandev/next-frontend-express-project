import React from "react";
import { cn } from "@/lib/utils";

const Title = ({ title, children, className }) => {
  return (
    <h1
      className={cn(
        `font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight`,
        className,
      )}
    >
      {title || children}
    </h1>
  );
};

export default Title;
