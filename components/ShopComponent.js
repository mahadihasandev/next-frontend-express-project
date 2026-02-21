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
    <div>
      <div className='flex w-full py-3 shadow-lg rounded-lg  flex-col items-center justify-center'>
        <h1 className="text-2xl font-bold text-center py-1">Shop</h1>
        <p className="text-center text-lg text-shop_dark_orange">Pic your Favorite Product</p>
      </div>
      <div className=" py-5 flex flex-col gap-5 items-start md:flex-row">
        <div className="hidden md:flex flex-col md:min-w-40 border hoverEffect mt-10 rounded-md">
              {category.map((category) => (
                <Button
                  key={category?._id}
                  
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  className={`bg-transparent border-0 py-5 my-1 text-darkColor 
         hover:bg-shop_dark_orange shadow-md rounded-md hover:text-white hover:scale-110 hover:rounded-md font-semibold 
        hoverEffect border-b last:border-b-0 capitalize ${category?.slug === currentProduct?.slug && "bg-shop_dark_orange text-white"}`}
                >
                  <p className="w-full text-left px-2">{category?.name}</p>
                </Button>
              ))}
            </div>
         <Accordion
        type="single"
        collapsible
        className="max-w-lg w-full md:hidden"
      >
        <AccordionItem value="category">
          <AccordionTrigger
            className="text-shop_dark_blue/80 text-lg tracking-wider 
        font-semibold border border-shop_light_blue/30  
         shadow hoverEffect shadow-shop_light_blue/30 
        hover:shadow-shop_light_blue/50 hover:border-shop_light_blue/50 rounded-md px-10 py-3 "
          >
            Filter
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col md:min-w-40 border hoverEffect rounded-md">
              {category.map((category) => (
                <Button
                  key={category?._id}
                  
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  className={`bg-transparent border-0 p-0 text-darkColor 
         hover:bg-shop_dark_orange shadow-md rounded-md hover:text-white px-6 hover:rounded-md font-semibold 
        hoverEffect border-b last:border-b-0 capitalize ${category?.slug === currentProduct?.slug && "bg-shop_dark_orange text-white"}`}
                >
                  <p className="w-full text-left px-2">{category?.name}</p>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

        <div>
      { !currentProduct ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:mt-10">
          {product?.map((item) => {
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
                    <ProductCard
                      product={item}
                      cartItem={cartItem}
                      handleCartUpdate={handleCartUpdate}
                      addToCartOptimistic={addToCartOptimistic}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>
      ):
       (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 mt-10">
          {currentProduct?.productList?.map((item) => {
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
                    <ProductCard
                      product={item}
                      cartItem={cartItem}
                      handleCartUpdate={handleCartUpdate}
                      addToCartOptimistic={addToCartOptimistic}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>)
      }
    </div>
        </div>
    </div>
  )
}

export default ShopComponent