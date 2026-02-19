import React from "react";
import { cn } from "@/lib/utils";

const Title = ({ title, children, className }) => {
  return (
    <h1
      className={cn(
        `font-sans font-semibold text-2xl text-shop_dark_gray tracking-wide`,
        className,
      )}
    >
      {title || children}
    </h1>
  );
};

export default Title;
