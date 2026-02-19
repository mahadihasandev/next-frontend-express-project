import Link from "next/link";

import { HiMiniStar } from "react-icons/hi2";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Title from "./Title";

const ProductCard = ({
  product,
  className,
  cartItem,
  handleCartUpdate,
  addToCartOptimistic,
}) => {
 

  return (
    <div
      className={cn(
        `border border-shop_dark_blue/20 group bg-white rounded-md shadow-[2px_2px_5px_-2px_#A9A9A9] hover:scale-105 hoverEffect`,
        className,
      )}
    >
      <div className="relative bg-shop_light_bg shadow-md rounded-md overflow-hidden">
        <Link  href={`/product/${product?.slug}`}>
          {product?.image && (
            <Image
              height={700}
              width={700}
              alt="ProductImage"
              className={`w-full h-64 object-cover overflow-hidden  transition-transform bg-shop_ duration-500 ease 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
              src={product?.image[0]}
              loading="lazy"
            />
          )}
        </Link>
      </div>
      <div className="p-3">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-sans text-shop_light_text">
            {product?.categories?.map((cat) => cat).join(",")}
          </p>
        )}

        <Title className="text-base font-medium text-black line-clamp-1">
          {product?.name}
        </Title>
        <div className="flex items-center gap-2">
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
          </div>
          <p className="text-xs tracking-wide text-shop_light_text">5 Review</p>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium text-sm font-sans">In Stock</p>
          <p
            className={`text-shop_dark_orange font-semibold text-sm ${product?.stock == 0 ? "text-red-600!" : "text-shop_dark_orange font-semibold text-sm"}`}
          >
            {product?.stock > 0 ? product?.stock : "unavailable"}
          </p>
        </div>
        <PriceView
          price={product?.regularprice}
          discount={product?.discount}
          className="text-sm"
        />
        <AddToCartButton
          product={product}
          cartItem={cartItem}
          handleCartUpdate={handleCartUpdate}
          addToCartOptimistic={addToCartOptimistic}
          className="rounded-full mt-1"
        />
      </div>
    </div>
  );
};

export default ProductCard;
