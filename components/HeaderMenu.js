"use client";
import Link from "next/link";
import { headerData } from "@/constant/data";
import { usePathname } from "next/navigation";

export default function HeaderMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:inline-flex items-center justify-center gap-2 lg:gap-3">
      {headerData.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.title}
            href={item.href}
            className={`px-4 py-2 rounded-xl text-sm md:text-[15px] font-bold transition-all duration-200 capitalize tracking-tight ${
              isActive
                ? "bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/80 shadow-xs"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
