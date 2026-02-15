import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useOutSideClick } from '@/hooks'
import { headerData } from '@/constant/data'


const SideMenu = ({isOpen,onClose}) => {
   const pathname=usePathname()
  const sideBarRef=useOutSideClick(onClose)
  return (
    <div 
    className={`fixed text-white/80 inset-y-0 h-screen left-0 z-50 w-full bg-black/50 backdrop-blur-md shadow-xl ${isOpen?'translate-x-0':'-translate-x-full'} hoverEffect`}>
      <div 
      className=' min-w-56 max-w-72 bg-black/95 h-screen p-10 border-r-2 border-shop_dark_green flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-5'>
        <Logo className='text-white' spanDesign="group-hover:text-white"/>
        <button onClick={onClose} className='text-red-300 hover:text-red-600 hoverEffect'><X size={20} /></button>
        </div>
        <div ref={sideBarRef} className='flex flex-col space-y-7 font-semibold tracking-wide'>
          
            {
              headerData?.map((item)=>(
                <Link key={item?.href} href={item?.href} 
                className={`hover:text-green-300 hoverEffect ${pathname==item?.href&&'text-green-300'}`}
                >
                  {item?.title}
                </Link>
              ))
            }
        </div>
       
      </div>
    </div>
  )
}

export default SideMenu