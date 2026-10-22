'use client'
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { AnimatePresence,motion } from 'motion/react';
import ProductCard from './ProductCard';


const ShopComponent = ({category,product}) => {
  
  const [cartData, setCartData] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  console.log(currentProduct.productList);
  

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

    
    const handleCategoryChange = (newCategory) => {
        let newSlug=newCategory?.slug;
        if(newSlug === currentProduct?.slug){
          
            setCurrentProduct('');
        }else{
            
            setCurrentProduct(newCategory);
        }
    };
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
    <div className="space-y-6">
      {/* Symmetrical Shop Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-center text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
          Verified Catalog
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Explore Product Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md">
          {currentProduct ? `Browsing ${currentProduct.name} collections` : "Select a department or browse all verified inventory."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Desktop Sidebar: Clean White Card with Emerald Active Pill */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border border-slate-200/80 rounded-3xl p-3 shadow-xs shrink-0 space-y-1 sticky top-24">
          <div className="px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
            <span>Filter Categories</span>
            {currentProduct && (
              <button
                onClick={() => setCurrentProduct('')}
                className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={() => setCurrentProduct('')}
            className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              !currentProduct
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
            }`}
          >
            All Categories
          </button>
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto space-y-0.5 pr-1">
            {category.map((cat) => {
              const isActive = cat?.slug === currentProduct?.slug;
              return (
                <button
                  key={cat?._id}
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  }`}
                >
                  <span className="truncate">{cat?.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Mobile Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full lg:hidden bg-white rounded-2xl border border-slate-200/80 p-2 shadow-xs"
        >
          <AccordionItem value="category" className="border-none">
            <AccordionTrigger className="text-xs font-bold text-slate-800 px-3 py-2 hover:no-underline">
              <span>Filter by Department {currentProduct ? `(${currentProduct.name})` : ''}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-1.5 pt-2">
                <button
                  onClick={() => setCurrentProduct('')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold text-left ${
                    !currentProduct ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-700"
                  }`}
                >
                  All Categories
                </button>
                {category.map((cat) => (
                  <button
                    key={cat?._id}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left truncate ${
                      cat?.slug === currentProduct?.slug
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-50 text-slate-700"
                    }`}
                  >
                    {cat?.name}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Product Cards Grid: Symmetrical 4-Column Layout */}
        <div className="flex-1 min-w-0">
          {!currentProduct ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {product?.map((item) => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProduct?.productList?.map((item) => {
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
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopComponent