"use client";
import { HiShoppingBag } from "react-icons/hi2";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";
import { useEffect, useState } from "react";

const AddToCartButton = ({
  product,
  className,
  cartItem,
  handleCartUpdate,
  addToCartOptimistic,
}) => {
  let itemCount = cartItem?.quantity || 0;

  let handleAddToCart = (item) => {
    addToCartOptimistic(item);
    fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/addtocart`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        cartId: item._id,
        ownerId: "6933e3def0c48d04280e0b90",
        quantity: 1,
      }),
    });

    // .then(function(res){ console.log(res,"data") })
    // .catch(function(res){ console.log(res) })
  };

  const outOfStock = product?.stock == 0;
  return (
    <>
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-darkColor/80">
              Quantity
            </span>
            <QuantityButton
              cartItem={cartItem}
              itemCount={itemCount}
              handleCartUpdate={handleCartUpdate}
              className=""
            />
          </div>
          <div className="flex items-center justify-between border-t border-shop_dark_orange pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              className=""
              amount={product.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => handleAddToCart(product)}
          disabled={outOfStock}
          className={cn(
            "w-full bg-white text-shop_dark_orange border border-shop_dark_orange font-semibold tracking-wide hover:text-white hover:bg-shop_dark_orange hover:border-shop_dark_orange hoverEffect",
            className,
          )}
        >
          <HiShoppingBag />
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
