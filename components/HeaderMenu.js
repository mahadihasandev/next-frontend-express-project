"use client"
import Link from "next/link"
import { headerData } from "@/constant/data"
import { usePathname } from "next/navigation"


export default function HeaderMenu() {
     const pathname=usePathname()
  
  return (
    <div className='hidden md:inline-flex items-center justify-center capitalize z-10 font-bold text-white font-sans gap-8'>
        {headerData.map((item)=>(
            <Link key={item.title} href={item?.href}
            className={`relative group z-10 hoverEffect hover:text-shop_dark_orange isolate ${pathname==item?.href&&'text-shop_dark_orange'}`}
            >
            {item.title}
            <span className={`absolute inset-0 -z-10 bg-shop_dark_orange -left-[25%] top-6 h-1.5 w-[150%] rounded scale-0 group-hover:scale-100 hoverEffect origin-center ${pathname==item?.href&&"scale-100"}`}/>
            </Link>
        ))}
    </div>
  )
}

