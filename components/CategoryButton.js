'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function CategoryButton({item}) {
  
  return (
    <div >
        <Link  href={`/category/${item._id}`}>
         <Button className="px-4 py-2 font-extrabold hover:scale-110 border-2 text-shop_dark_orange hover:border-shop_orange hover:bg-white bg-white font-sans hoverEffect">
                {item.name}
              </Button>
              </Link>
    </div>
  )
}
