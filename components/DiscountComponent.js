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
    <Container className="space-y-8 py-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-center text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
          Exclusive Markdowns
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Limited-Time Special Discounts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md">
          Discover verified deals with instant promotional savings applied automatically at checkout.
        </p>
      </div>

      <div>
        {discountData?.discount?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {discountData.discount.map((item) => {
              const cartItem = cartData?.find(
                (cart) => cart?.cartId?._id === item?._id
              );
              return (
                <AnimatePresence key={item._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      product={item}
                      cartItem={cartItem}
                      handleCartUpdate={handleCartUpdate}
                      addToCartOptimistic={addToCartOptimistic}
                    />
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-md mx-auto shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto font-bold text-xl">
              %
            </div>
            <h2 className="text-xl font-bold text-slate-900">No Discount Offers Active</h2>
            <p className="text-xs text-slate-500">
              All promotional items are currently sold out or restored to standard retail pricing.
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}

export default DiscountComponent