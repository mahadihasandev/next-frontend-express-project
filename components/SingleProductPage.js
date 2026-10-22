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
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <HiMiniStar
                  key={index}
                  size={16}
                  className={index < 4 ? "text-emerald-600 fill-emerald-600" : "text-slate-300 fill-slate-200"}
                />
              ))}
              <span className="text-xs text-slate-500 font-bold ml-1.5">
                4.8 (45 verified reviews)
              </span>
            </div>
          </div>
          <div className="space-y-3 border-t border-b border-slate-200/80 py-5">
            <PriceView
              price={product?.regularprice}
              discount={product?.discount}
              className="text-2xl font-black text-slate-900"
            />
            <div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                  (product?.stock || 0) > 0
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${(product?.stock || 0) > 0 ? "bg-emerald-500" : "bg-slate-400"}`} />
                {(product?.stock || 0) > 0 ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
              </span>
            </div>
          </div>

          <AddToCartButton
            product={product}
            cartItem={cartItem}
            handleCartUpdate={handleCartUpdate}
            addToCartOptimistic={addToCartOptimistic}
            className="rounded-2xl mt-1 h-12"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200/80 py-4 -mt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer">
              <RxBorderSplit className="text-base text-emerald-600" />
              <span>Compare</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer">
              <FaRegQuestionCircle className="text-base text-emerald-600" />
              <span>Ask Question</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer">
              <TbTruckDelivery className="text-base text-emerald-600" />
              <span>Delivery Info</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer">
              <FiShare2 className="text-base text-emerald-600" />
              <span>Share</span>
            </div>
          </div>

          {/* Delivery & Guarantee Cards (Visual Color Science: Slate & Emerald) */}
          <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/50">
            <div className="p-4 flex items-center gap-3 border-b border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <BsTruck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Standard & Express Delivery
                </p>
                <p className="text-xs text-slate-500">
                  Direct dispatch from verified merchant hub with live order tracking.
                </p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CornerDownLeft className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Hassle-Free 30-Day Returns
                </p>
                <p className="text-xs text-slate-500">
                  100% money-back guarantee on unopened or damaged items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Product Specifications & Description
        </h2>
        <div
          className="text-sm text-slate-600 leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        />
      </div>
    </Container>
  );
};

export default SingleProductPage;
