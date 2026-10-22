"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import NoProduct from "./NoProduct";

const ProductGrid = ({ initialProducts = [] }) => {
  const [product, setProduct] = useState(
    Array.isArray(initialProducts) && initialProducts.length > 0 ? initialProducts : []
  );
  const [loading, setLoading] = useState(!initialProducts || initialProducts.length === 0);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProduct(initialProducts);
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API || "https://e-commerce-backend-multivandor.vercel.app"}/api/v1/product/viewproduct`
        );
        const data = await res.json();
        setProduct(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [initialProducts]);

  useEffect(() => {
    async function getCartData() {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API || "https://e-commerce-backend-multivandor.vercel.app"}/api/v1/product/viewaddtocart`
        );
        const posts = await data.json();
        setCartData(Array.isArray(posts) ? posts : []);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
    getCartData();

    // Listen to custom event for instant zero-polling updates
    const handleCartSync = () => getCartData();
    window.addEventListener("cart-updated", handleCartSync);
    return () => window.removeEventListener("cart-updated", handleCartSync);
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
    setCartData(newCartData.filter((item) => item.quantity > 0));
  };

  const addToCartOptimistic = (prod) => {
    const newItem = {
      _id: `temp-${prod._id}`,
      cartId: prod,
      quantity: 1,
    };
    setCartData([...cartData, newItem]);
  };

  return (
    <div className="w-full">
      {loading ? (
        <Loader />
      ) : product?.length ? (
        /* Symmetrical 4-column desktop grid with hardware-accelerated rendering */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {product.map((item) => {
            const cartItem = cartData?.find(
              (cart) => cart?.cartId?._id === item?._id
            );
            return (
              <div key={item._id} className="w-full flex justify-center">
                <ProductCard
                  product={item}
                  cartItem={cartItem}
                  handleCartUpdate={handleCartUpdate}
                  addToCartOptimistic={addToCartOptimistic}
                />
              </div>
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
