"use client";
import { HiShoppingBag } from "react-icons/hi2";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";

const AddToCartButton = ({
  product,
  className,
  cartItem,
  handleCartUpdate,
  addToCartOptimistic,
}) => {
  const itemCount = cartItem?.quantity;

  const handleAddToCart = async (item) => {
    if (addToCartOptimistic) addToCartOptimistic(item);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API || "http://localhost:8000"}/api/v1/product/addtocart`,
        {
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
        }
      );
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const outOfStock = Number(product?.stock || 0) === 0;

  return (
    <div className="w-full">
      {itemCount ? (
        <div className="text-xs w-full space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              Qty
            </span>
            <QuantityButton
              cartItem={cartItem}
              itemCount={itemCount}
              handleCartUpdate={handleCartUpdate}
              className="scale-90"
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Total</span>
            <PriceFormatter
              className="font-bold text-emerald-700"
              amount={product.saleprice ? product.saleprice * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => handleAddToCart(product)}
          disabled={outOfStock}
          className={cn(
            "w-full h-11 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2",
            outOfStock
              ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white shadow-xs cursor-pointer",
            className
          )}
        >
          <HiShoppingBag className="w-4 h-4" />
          <span>{outOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
