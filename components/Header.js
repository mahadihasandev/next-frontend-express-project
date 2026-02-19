import React from 'react'
import Container from './Container'
import HeaderMenu from './HeaderMenu'
import MobileMenu from './MobileMenu'
import AuthPage from './AuthPage'
import { TiShoppingCart } from "react-icons/ti";
import Link from 'next/link'


const Header = () => {
  return (
    <header className='bg-black/90 py-5 sticky top-0 z-50 backdrop-blur-lg shadow rounded-b-lg'>
        <Container className='flex justify-between items-center px-1'>
            <div className='w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0'>
              logo
                <MobileMenu/>         
            </div>
            <div className='w-auto md:w-1/3'>
             <HeaderMenu/>
            </div>
            <div className='w-auto md:w-1/3 flex items-center justify-end gap-2.5 md:gap-5'>
            <Link href='/cart' className='relative'>
            <TiShoppingCart size={30} className='text-white absolute -top-3 right-0' />
            <span className='absolute -top-4 -right-1 bg-shop_dark_orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>0</span>
            </Link>
            <AuthPage/>
            </div>
            
        </Container>
    </header>
  )
}

export default Header