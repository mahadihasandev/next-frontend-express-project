'use client'
import React, { useState } from 'react'
import { IoReorderThree } from "react-icons/io5";
import SideMenu from './SideMenu';


const MobileMenu = () => {
  const [isSideBarOpen,setIsSideBarOpen]=useState(false)
  return (
    <>
    <button onClick={()=>(setIsSideBarOpen(!isSideBarOpen))}>
        <IoReorderThree size={25} className=' text-white hover:text-white hoverEffect md:hidden hover:cursor-pointer'/>
    </button>
    <div className='md:hidden'>
      <SideMenu
      isOpen={isSideBarOpen}
      onClose={()=>setIsSideBarOpen(false)}
      />
    </div>
    
    </>
  )
}

export default MobileMenu