import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/">
    <div className='group'>
      <h1 className='text-3xl font-p text-orange-500 group-hover:text-gray-300 font-extrabold hover:cursor-pointer hoverEffect'>Carti<span 
      className='text-3xl group-hover:text-orange-500 text-gray-300 font-extrabold hover:cursor-pointer hoverEffect'>fy</span></h1>
    </div>
    </Link>
  )
}

export default Logo