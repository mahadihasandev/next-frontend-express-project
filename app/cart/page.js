'use client'
import CartComponent from '@/components/CartComponent'
import Container from '@/components/Container'
import { useState, useEffect } from 'react'


const Cart = () => {
  const [cartData, setCartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewaddtocart`)
        const posts = await data.json()
        setCartData(posts)
      } catch (error) {
        console.error('Failed to fetch cart data:', error)
        setCartData([])
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  if (loading) {
    return (
      <Container>
        <div className='h-screen pt-8 flex justify-center items-center'>
          <p>Loading cart...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
        <CartComponent cartData={cartData}/>
    </Container>
  )
}

export default Cart

