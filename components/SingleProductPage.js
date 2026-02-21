"use client"
import Container from "@/components/Container";

import { HiMiniStar } from "react-icons/hi2";
import PriceView from "@/components/PriceView";


import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { BsTruck } from "react-icons/bs";

import { CornerDownLeft } from "lucide-react";

import Image from "next/image";

import NoProduct from "./NoProduct";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";

const SingleProductPage = ({product}) => {
  const [mainImage, setMainImage] = useState(product?.image[0]);
  const [cartData, setCartData] = useState([]);
  console.log(product)
 
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

  if (!product) {
    return <NoProduct/>;

  }

  const handleImageClick = (Image) => {
    setMainImage(Image);
  }
const cartItem = cartData?.find((cart) => cart?.cartId?._id === product?._id )
  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-10 pb-10 shadow-md">
        <div className="w-full md:w-1/2 pt-10">
          {product?.image && (
            <>
            <Image
            height={700}
            width={700}
            alt="ProductImage"
            className={`w-full h-[80%] mb-10 object-cover overflow-hidden hoverEffect
            ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            src={mainImage}
            loading="lazy"
          />
          <div className="flex items-center gap-2">
            {product?.image?.map((image, index) => (
              <button className="cursor-pointer" onClick={() => handleImageClick(image)} key={index}>
              <Image
                height={700}
                width={700}
                alt="ProductImage"
                className={`w-16 h-16 mb-5 object-cover overflow-hidden shadow-lg hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
                src={image}
                loading="lazy"
              />
              </button>
            ))}
          </div>
          </>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="space-y-1 pt-10 ">
            <h2 className="text-2xl font-bold font-poppins">{product?.name}</h2>
            <div className="text-normalm text-gray-600 font-poppins tracking-wide font-normal">
              <h1 className="text-lg font-bold font-sans py-2">Quick Overview</h1>
              {product?.quickoverview&& (
                <div
      dangerouslySetInnerHTML={{__html: product?.quickoverview}}
    />
              )}
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <HiMiniStar
                  key={index}
                  size={15}
                  className={
                    index < 4 ? "text-shop_dark_orange" : "text-shop_light_text"
                  }
                  fill={index < 4 ? "#ef4a23" : "#ababab"}
                />
              ))}
              <p className="text-sm text-gray-600 font-poppins tracking-wide font-bold">
                {`(45 reviews)`}{" "}
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-b border-gray-200 py-5">
            <PriceView
              price={product?.regularprice}
              discount={product?.discount}
              className="text-lg font-bold"
            />
            <p
              className={`inline-block px-4 py-1.5 text-sm text-center font-poppins rounded-lg 
          tracking-wide font-semibold 
          ${product?.stock == 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
            >
              {`${(product?.stock) > 0 ? "In Stock" : "Out of Stock"}`}
            </p>
          </div>
          
          
              <AddToCartButton
          product={product}
          cartItem={cartItem}
          handleCartUpdate={handleCartUpdate}
          addToCartOptimistic={addToCartOptimistic}
          className="rounded-full mt-1"
        />
          
          
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <RxBorderSplit className="text-lg" />
              <p>Compare color</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <FaRegQuestionCircle className="text-lg" />
              <p>Ask a question</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <TbTruckDelivery className="text-lg" />
              <p>Delivery & Return</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <FiShare2 className="text-lg" />
              <p>Share</p>
            </div>
          </div>
          <div className="flex flex-col shadow-md shadow-shop_light_blue/20">
            <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
              <BsTruck size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Free Delivery
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  Enter your Postal code for Delivey Availability.
                </p>
              </div>
            </div>
            <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
              <CornerDownLeft size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Return Delivery
                </p>
                <p className="text-sm text-gray-500 ">
                  Free 30days Delivery Returns.{" "}
                  <span className="underline underline-offset-2">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border flex flex-col text-center border-gray-200 p-5">
        <h1 className="text-2xl font-bold font-poppins py-5">Description</h1>
        <div className="text-normal text-center text-gray-600 font-poppins tracking-wide font-normal"
      dangerouslySetInnerHTML={{__html: product?.description}}
    />
      </div>
    </Container>
  );
};

export default SingleProductPage;
