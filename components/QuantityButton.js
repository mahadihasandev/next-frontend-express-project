import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

const QuantityButton = ({
  cartItem,
  className,
  itemCount,
  handleCartUpdate,
}) => {
  const isOutOfStock = Number(cartItem?.cartId?.stock || 0) === 0;

  const handleQuantity = (item, type) => {
    if (type === "increment") {
      handleCartUpdate(item._id, "increment");
    } else if (type === "decrement") {
      handleCartUpdate(item._id, "decrement");
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API || "http://localhost:8000"}/api/v1/product/addtocart?type=${type}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          cartId: item.cartId._id,
          quantity: 1,
        }),
      }
    )
      .then(() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cart-updated"));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-0.5",
        className
      )}
    >
      <button
        disabled={itemCount === 0 || isOutOfStock}
        onClick={() => handleQuantity(cartItem, "decrement")}
        className="text-slate-400 hover:text-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
      >
        <FaMinusCircle size={14} />
      </button>
      <span className="font-bold text-xs w-4 text-center text-slate-800">
        {itemCount}
      </span>
      <button
        disabled={isOutOfStock}
        onClick={() => handleQuantity(cartItem, "increment")}
        className="text-slate-400 hover:text-emerald-600 disabled:opacity-40 transition-colors cursor-pointer"
      >
        <FaPlusCircle size={14} />
      </button>
    </div>
  );
};

export default QuantityButton;
