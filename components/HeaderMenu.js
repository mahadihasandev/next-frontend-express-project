"use client"
import Link from "next/link"
import { headerData } from "@/constant/data"
import { usePathname } from "next/navigation"


export default function HeaderMenu() {
     const pathname=usePathname()
  
  return (
    <div className='hidden md:inline-flex items-center justify-center capitalize z-10 font-bold text-black font-sans gap-8'>
        {headerData.map((item)=>(
            <Link key={item.title} href={item?.href}
            className={`hover:text-white relative group z-10 hoverEffect isolate ${pathname==item?.href&&'text-white'}`}
            >
            {item.title}
            <span className={`absolute inset-0 -z-10 bg-shop_dark_green -left-[25%] -top-2 p-5 rounded-2xl w-[150%] scale-0 group-hover:scale-100 hoverEffect origin-center ${pathname==item?.href&&"scale-100"}`}/>
            </Link>
        ))}
    </div>
  )
}

