'use client'
import React, { useEffect, useRef } from 'react'
import Container from './Container'
import HeaderMenu from './HeaderMenu'
import MobileMenu from './MobileMenu'
import AuthPage from './AuthPage'
import { TiShoppingCart } from "react-icons/ti";
import Link from 'next/link'
import Logo from './Logo'


const Header = () => {
  const cartCountRef = useRef(null)

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewaddtocart`)
        const cart = await data.json()
        if (cartCountRef.current) {
          cartCountRef.current.textContent = cart?.length || 0
        }
      } catch (error) {
        console.error('Error fetching cart count:', error)
      }
    }

    // Fetch immediately
    fetchCartCount()

    // Set up polling every 5 seconds
    const interval = setInterval(fetchCartCount, 3000)

    return () => clearInterval(interval)
  }, [])
        
        
  return (
    <header className='bg-black/90 py-5 sticky top-0 z-50 backdrop-blur-lg shadow rounded-b-lg'>
        <Container className='flex justify-between items-center'>
            <div className='w-auto md:w-1/3 flex items-center justify-start gap-2.5 text-white md:gap-0'>
              
                <MobileMenu/>
                <Logo/>        
            </div>
            <div className='w-auto md:w-1/3'>
             <HeaderMenu/>
            </div>
            <div className='w-auto md:w-1/3 flex items-center justify-end gap-2.5 md:gap-5'>
            <Link href='/cart' className='relative'>
            <TiShoppingCart size={30} className='text-white absolute -top-3 right-0' />
            <span ref={cartCountRef} className='absolute -top-4 -right-1 bg-shop_dark_orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>0</span>
            </Link>
            <AuthPage/>
            </div>
            
        </Container>
    </header>
  )
}

export default Header