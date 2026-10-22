"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FolderTree, Sparkles } from "lucide-react";

const HomeCategory = ({ initialCategories = [] }) => {
  const [category, setCategory] = useState(
    Array.isArray(initialCategories) && initialCategories.length > 0 ? initialCategories : []
  );

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategory(initialCategories);
      return;
    }
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API || "http://localhost:8000"}/api/v1/product/viewcategory`
        );
        const data = await response.json();
        setCategory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load featured categories:", err);
      }
    };
    fetchCategory();
  }, [initialCategories]);

  if (!category || category.length === 0) return null;

  return (
    <section className="w-full space-y-6 pt-4">
      {/* Symmetrical Section Header (Strict 3 Colors: White, Slate, Emerald) */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
          <FolderTree className="w-3.5 h-3.5 text-emerald-600" />
          Shop By Category
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Browse Popular Collections
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Navigate curated product categories to discover trending releases.
        </p>
      </div>

      {/* Symmetrical 4-Column Grid with Identical Card Sizes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.slice(0, 8).map((item) => {
          const raw =
            item?.productList?.[0]?.image?.[0] || item?.image;
          const imgUrl = raw
            ? raw.startsWith("http")
              ? raw
              : `${process.env.NEXT_PUBLIC_API || "http://localhost:8000"}${raw.startsWith("/") ? "" : "/"}${raw}`
            : null;

          return (
            <Link
              key={item._id}
              href={`/category/${item?.slug || item?._id}`}
              className="block group"
            >
              {/* Strictly Uniform Category Card (Exact 220px Height) */}
              <div className="h-56 w-full rounded-3xl bg-white border border-slate-200/80 p-5 flex flex-col items-center justify-center text-center hover:border-emerald-500 hover:shadow-xl transition-all duration-300 shadow-xs">
                {/* Fixed Dimension Image Circle (w-24 h-24 / 96x96px) */}
                <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden mb-3 shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={item?.name || "Category"}
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-600 bg-emerald-50 font-bold text-2xl">
                      {item.name ? item.name.charAt(0).toUpperCase() : <FolderTree className="w-8 h-8" />}
                    </div>
                  )}
                </div>

                {/* Uniform Text Area */}
                <div className="h-6 flex items-center">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate max-w-[180px]">
                    {item?.name}
                  </h3>
                </div>

                <div className="h-5 flex items-center mt-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    {item.subcategoryList?.length || item.productList?.length || 0} items
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HomeCategory;