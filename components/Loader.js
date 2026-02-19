import React from 'react'
import { TbLoader3 } from 'react-icons/tb'

const Loader = () => {
  return (
    <div>
    <div className='flex flex-col items-center justify-center py-10 min-h-80 gap-4 
      bg-gray-100 w-full mt-10'>
        <div className='space-x-2 flex items-center text-blue-600'>
          <TbLoader3 className='w-10 h-9 animate-spin text-shop_light_blue'/>
          <span>Product is Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Loader