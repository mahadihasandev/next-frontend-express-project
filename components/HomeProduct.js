import React from 'react'
import ProductGrid from './ProductGrid'

const HomeProduct = () => {
  return (
    <div className='flex flex-col mt-5 md:mt-0 justify-center items-center w-full'>
      <h1 className='md:text-2xl font-bold text-shop_dark_gray'>Featured Products</h1>
      <p className='text-sm text-shop_dark_orange'>Get Your Desired Product from Featured Products!</p>
      <ProductGrid/>
    </div>
  )
}

export default HomeProduct