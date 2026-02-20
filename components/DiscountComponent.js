"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { AnimatePresence,motion } from 'motion/react';
import Container from './Container';

const DiscountComponent = ({ discountData }) => {
    const [cartData, setCartData] = useState([]);
    console.log(discountData);
    
     useEffect(() => {
         async function getCartData() {
           const data = await fetch(
             `${process.env.NEXT_PUBLIC_API}/api/v1/product/viewaddtocart`,
           );
           const posts = await data.json();
           setCartData(posts);
         }
         getCartData();
       }, []);

        const handleCartUpdate = (cartId, action) => {
    const newCartData = cartData.map((item) => {
      if (item._id === cartId) {
        return {
          ...item,
          quantity:
            action === "increment" ? item.quantity + 1 : item.quantity - 1,
        };
      }
      return item;
    });
    // Filter out items with quantity 0 or less
    const filteredCartData = newCartData.filter((item) => item.quantity > 0);
    setCartData(filteredCartData);
  };

  const addToCartOptimistic = (product) => {
    // Generate a temporary ID or use product ID to track it
    const newItem = {
      _id: `temp-${product._id}`,
      cartId: product,
      quantity: 1,
    };
    setCartData([...cartData, newItem]);
  };
    
  return (
    <Container>
        <div className='flex flex-col py-3 shadow-lg rounded-lg items-center justify-center'>
                        <h1 className="text-2xl font-bold text-center">Top discount</h1>
                        <p className="text-center text-shop_dark_orange">Discover our best deals and exclusive offers</p>
                    </div>
        <div>
      {
       discountData?.discount?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          {discountData.discount.map((item) => {
            const cartItem = cartData?.find(
              (cart) => cart?.cartId?._id === item?._id,
            );
            return (
              <AnimatePresence key={item._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div>
                    
                    <div className='flex flex-col items-center justify-center'>
                        <span className='bg-shop_dark_orange text-white text-xs font-bold px-1 rounded-sm my-4 text-center'>{item.discount} Tk OFF</span>
                    </div>
                    <ProductCard
                      product={item}
                      cartItem={cartItem}
                      handleCartUpdate={handleCartUpdate}
                      addToCartOptimistic={addToCartOptimistic}
                      className=""
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center border p-5 w-96 shadow-lg shadow-shop_dark_orange rounded-lg">
          <h1 className="text-2xl font-sans text-shop_dark_orange pb-10 text-center">No Discount Product Found</h1>
        </div>
      )}
    </div>
    </Container>
  )
}

export default DiscountComponent