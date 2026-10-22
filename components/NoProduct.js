"use client";
import React from "react";
import { motion } from "motion/react";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

const NoProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 w-full text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-slate-200/80 rounded-3xl p-10 max-w-md w-full shadow-xs space-y-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
          <PackageSearch className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            No Products Available
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            There are currently no items listed in this department. Please explore our other categories or check back soon.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all"
        >
          Explore All Products
        </Link>
      </motion.div>
    </div>
  );
};

export default NoProduct;
