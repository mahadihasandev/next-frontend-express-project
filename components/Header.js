import React from 'react'
import Container from './Container'
import HeaderMenu from './HeaderMenu'
import MobileMenu from './MobileMenu'


const Header = () => {
  return (
    <header className='bg-shop_dark_green/20 py-5 sticky top-0 z-50 backdrop-blur-md shadow rounded-b-lg'>
        <Container className='flex justify-between items-center px-1'>
            <div className='w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0'>
              logo
                <MobileMenu/>         
            </div>
            <div className='w-auto md:w-1/3'>
             <HeaderMenu/>
            </div>
            <div className='w-auto md:w-1/3 flex items-center justify-end gap-2.5 md:gap-5'>
            others
            </div>
            
        </Container>
    </header>
  )
}

export default Header