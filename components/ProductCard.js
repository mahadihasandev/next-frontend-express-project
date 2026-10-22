import Link from "next/link";
import { HiMiniStar } from "react-icons/hi2";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const ProductCard = ({
  product,
  className,
  cartItem,
  handleCartUpdate,
  addToCartOptimistic,
}) => {
  const rawImg =
    product?.image &&
    (Array.isArray(product.image) ? product.image[0] : product.image);
  const inStock = Number(product?.stock || 0) > 0;

  return (
    <div
      className={cn(
        "h-[460px] w-full flex flex-col justify-between p-4 bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 group select-none",
        className
      )}
    >
      {/* Top Section: Fixed Image + Details */}
      <div className="flex-1 flex flex-col">
        {/* Strictly Uniform Image Area (Exact fixed height 208px / h-52) */}
        <div className="relative h-52 w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 mb-3">
          <Link href={`/product/${product?._id}`} className="block w-full h-full relative">
            {rawImg ? (
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                alt={product?.name || "Product"}
                className={`object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                  !inStock ? "opacity-50 grayscale" : ""
                }`}
                src={rawImg}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Sparkles className="w-8 h-8" />
              </div>
            )}
          </Link>

          {/* Strict 3-Color Badges: White, Slate, Emerald */}
          {product?.discount ? (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-white shadow-xs">
              -{product.discount}% OFF
            </span>
          ) : inStock ? (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
              IN STOCK
            </span>
          ) : (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-slate-300 shadow-xs">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Text Content with Strict Uniform Heights for 100% Symmetry */}
        <div className="flex-1 flex flex-col justify-between space-y-1">
          {/* Category Tag (Fixed 18px / h-4.5) */}
          <div className="h-4.5 flex items-center overflow-hidden">
            <p className="uppercase text-[10px] font-bold tracking-wider text-slate-400 truncate">
              {product?.categories
                ? Array.isArray(product.categories)
                  ? product.categories.join(", ")
                  : product.categories
                : "STORE CATALOG"}
            </p>
          </div>

          {/* Product Title (Strictly fixed height 40px / h-10 with 2 lines max) */}
          <div className="h-10 flex items-start overflow-hidden">
            <Link href={`/product/${product?._id}`} className="w-full">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                {product?.name || "Product Title"}
              </h3>
            </Link>
          </div>

          {/* Rating (Strictly fixed height 20px / h-5) */}
          <div className="h-5 flex items-center gap-1.5 pt-0.5">
            <div className="flex items-center text-emerald-600">
              {[...Array(5)].map((_, index) => (
                <HiMiniStar key={index} size={14} />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-400">(5.0)</span>
          </div>

          {/* Price & Stock Row (Strictly fixed height 24px / h-6) */}
          <div className="h-6 flex items-center justify-between pt-1">
            <PriceView
              price={product?.regularprice}
              discount={product?.discount}
              className="text-sm font-extrabold text-slate-900"
            />
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                inStock
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}
            >
              {inStock ? `${product.stock} left` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Button (Strictly uniform height 44px / h-11) */}
      <div className="pt-3 shrink-0">
        <AddToCartButton
          product={product}
          cartItem={cartItem}
          handleCartUpdate={handleCartUpdate}
          addToCartOptimistic={addToCartOptimistic}
          className="w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center justify-center cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductCard;
