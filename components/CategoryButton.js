'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function CategoryButton({item}) {
  
  return (
    <div >
        <Link  href={`/category/${item._id}`}>
         <Button className="px-4 py-2 font-bold hover:scale-110 border-2 text-shop_dark_green hover:text-white border-shop_dark_green hover:border-shop_orange hover:bg-shop_btn_dark_green bg-white font-poppins rounded-lg hoverEffect">
                {item.name}
              </Button>
              </Link>
    </div>
  )
}
