"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Grid3X3,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Camera,
  Shirt,
  Home as HomeIcon,
  ShoppingBag,
  Cpu,
  Layers,
  X,
} from "lucide-react";

export default function CategoryComponent({ initialCategories = [] }) {
  const [categories, setCategories] = useState(
    Array.isArray(initialCategories) && initialCategories.length > 0 ? initialCategories : []
  );
  const [loading, setLoading] = useState(
    !initialCategories || initialCategories.length === 0
  );
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const megaRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
      setLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API || "http://localhost:8000"}/api/v1/product/viewcategory`
        );
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [initialCategories]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setIsMegaOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Icon mapping helper based on category name
  const getCategoryIcon = (name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes("laptop") || lower.includes("computer") || lower.includes("desktop") || lower.includes("dasktop"))
      return Laptop;
    if (lower.includes("phone") || lower.includes("smartphone"))
      return Smartphone;
    if (lower.includes("sound") || lower.includes("audio"))
      return Headphones;
    if (lower.includes("gaming") || lower.includes("esport"))
      return Gamepad2;
    if (lower.includes("camera") || lower.includes("optics"))
      return Camera;
    if (lower.includes("fashion") || lower.includes("shoe") || lower.includes("footwear"))
      return Shirt;
    if (lower.includes("home") || lower.includes("workstation"))
      return HomeIcon;
    if (lower.includes("bag") || lower.includes("travel"))
      return ShoppingBag;
    return Cpu;
  };

  if (loading) {
    return (
      <div className="w-full h-14 bg-white border border-slate-200/80 rounded-2xl shadow-xs my-2 flex items-center justify-between px-6 animate-pulse">
        <div className="h-8 w-36 bg-slate-100 rounded-xl" />
        <div className="hidden md:flex gap-3">
          <div className="h-6 w-20 bg-slate-100 rounded-lg" />
          <div className="h-6 w-24 bg-slate-100 rounded-lg" />
          <div className="h-6 w-20 bg-slate-100 rounded-lg" />
          <div className="h-6 w-28 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-8 w-24 bg-slate-100 rounded-xl" />
      </div>
    );
  }

  if (!categories || categories.length === 0) return null;

  // Split categories: Primary featured (first 6) and the rest in "More Categories"
  const primaryCategories = categories.slice(0, 6);
  const overflowCategories = categories.slice(6);

  return (
    <div className="w-full relative z-40 mt-1 mb-2 select-none">
      {/* Sleek Single-Line Executive Bar (Strict Visual Color Science: White, Slate, Emerald) */}
      <div className="w-full h-14 bg-white border border-slate-200/80 rounded-2xl px-3 sm:px-4 flex items-center justify-between gap-3 shadow-xs">
        {/* Left: All Departments Mega-Menu Trigger */}
        <div className="relative" ref={megaRef}>
          <button
            onClick={() => setIsMegaOpen(!isMegaOpen)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Grid3X3 className="w-4 h-4 text-emerald-400" />
            <span>All Departments</span>
            <span className="hidden sm:inline-block bg-slate-800 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              {categories.length}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                isMegaOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Mega-Menu Overlay: 3 Clean Symmetrical Columns */}
          {isMegaOpen && (
            <div className="absolute left-0 top-full mt-2 w-[92vw] sm:w-[640px] md:w-[780px] lg:w-[880px] bg-white border border-slate-200/80 rounded-3xl shadow-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Grid3X3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      Explore All Store Departments
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Browse full catalog across {categories.length} organized categories
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMegaOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 3-Column Symmetrical Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[60vh] overflow-y-auto pr-2">
                {categories.map((cat) => {
                  const CatIcon = getCategoryIcon(cat.name);
                  const hasSubs = cat.subcategoryList && cat.subcategoryList.length > 0;

                  return (
                    <div
                      key={cat._id}
                      className="p-3 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all group"
                    >
                      <Link
                        href={`/category/${cat.slug || cat._id}`}
                        onClick={() => setIsMegaOpen(false)}
                        className="flex items-center justify-between mb-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-800 flex items-center justify-center shrink-0 transition-colors">
                            <CatIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                            {cat.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>

                      {/* Subcategories list */}
                      {hasSubs ? (
                        <div className="pl-9 space-y-1">
                          {cat.subcategoryList.slice(0, 3).map((sub) => (
                            <Link
                              key={sub._id}
                              href={`/subcategory/${sub.slug}`}
                              onClick={() => setIsMegaOpen(false)}
                              className="block text-[11px] font-medium text-slate-500 hover:text-emerald-700 hover:underline truncate"
                            >
                              • {sub.name}
                            </Link>
                          ))}
                          {cat.subcategoryList.length > 3 && (
                            <Link
                              href={`/category/${cat.slug || cat._id}`}
                              onClick={() => setIsMegaOpen(false)}
                              className="block text-[10px] font-bold text-emerald-600 hover:underline pt-0.5"
                            >
                              +{cat.subcategoryList.length - 3} more subcategories
                            </Link>
                          )}
                        </div>
                      ) : (
                        <p className="pl-9 text-[11px] text-slate-400 italic">
                          Direct category items
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Catalog Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Looking for a specific component or gadget?
                </span>
                <Link
                  href="/shop"
                  onClick={() => setIsMegaOpen(false)}
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <span>Open Full Catalog Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Center: Curated Single-Line Links (Strictly No Multi-line Wrapping!) */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center min-w-0">
          {primaryCategories.map((cat) => {
            const hasSubs = cat.subcategoryList && cat.subcategoryList.length > 0;

            return (
              <div key={cat._id} className="relative group shrink-0">
                <Link
                  href={`/category/${cat.slug || cat._id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  <span>{cat.name}</span>
                  {hasSubs && (
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Hover Flyout for Subcategories */}
                {hasSubs && (
                  <div className="absolute left-0 top-full pt-1.5 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-150 min-w-[200px]">
                    <div className="bg-white border border-slate-200/80 shadow-xl rounded-2xl p-2 space-y-0.5">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                        {cat.name}
                      </div>
                      {cat.subcategoryList.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/subcategory/${sub.slug}`}
                          className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                        >
                          <span>{sub.name}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* "More Categories" Dropdown for Remaining Categories */}
          {overflowCategories.length > 0 && (
            <div className="relative shrink-0" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>More Categories</span>
                <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  +{overflowCategories.length}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                    isMoreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200/80 shadow-2xl rounded-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Additional Departments
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-0.5 pr-1">
                    {overflowCategories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/category/${cat.slug || cat._id}`}
                        onClick={() => setIsMoreOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                      >
                        <span className="truncate">{cat.name}</span>
                        <ArrowRight className="w-3 h-3 text-emerald-600 opacity-60" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Quick Action Deal Accent Pill (Visual Color Science 10% Focal Action) */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/discount"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all shadow-2xs whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Top Deals</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
