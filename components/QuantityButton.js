import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const QuantityButton = ({
  cartItem,
  className,
  itemCount,
  handleCartUpdate,
}) => {
  const isOutOfStock = cartItem?.cartId?.stock == 0;

  const handleQuantity = (item, type) => {
    if (type == "increment") {
      handleCartUpdate(item._id, "increment");
    } else if (type == "decrement") {
      handleCartUpdate(item._id, "decrement");
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API}/api/v1/product/addtocart?type=${type}`,
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
      },
    )
      .then(function (res) {})
      .catch(function (res) {
        console.log(res);
      });
  };
  return (
    <div
      className={cn(
        `flex items-center gap-2 pb-1 rounded-xl border border-shop_dark_orange px-3 py-1 my-1`,
        className,
      )}
    >
      <button
        disabled={itemCount == 0 || isOutOfStock}
        onClick={() => handleQuantity(cartItem, "decrement")}
      >
        <FaMinusCircle
          size={17}
          className="text-shop_dark_orange hover:text-red-500 hoverEffect"
        />
      </button>
      <span className="font-semibold font-sm w-3 text-center text-darkColor">
        {itemCount}
      </span>
      <button
        disabled={isOutOfStock}
        onClick={() => handleQuantity(cartItem, "increment")}
      >
        <FaPlusCircle
          size={17}
          className="text-shop_dark_orange hover:text-green-500 hoverEffect"
        />
      </button>
    </div>
  );
};

export default QuantityButton;
