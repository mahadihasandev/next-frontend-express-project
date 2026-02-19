"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import NoProduct from "./NoProduct";

const ProductGrid = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    async function ProductData() {
      setLoading(true);
      try {
        let data = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/product/viewproduct`,
        );
        const ProductData = await data.json();
        setProduct(ProductData);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    }
    ProductData();
  }, []);

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
    <div>
      {loading ? (
        <Loader />
      ) : product?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          {product?.slice(0, 15).map((item) => {
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
      ) : (
        <NoProduct />
      )}
    </div>
  );
};

export default ProductGrid;
