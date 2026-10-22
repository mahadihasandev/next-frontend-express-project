import React from "react";
import ProductGrid from "./ProductGrid";
import { Sparkles } from "lucide-react";

const HomeProduct = ({ initialProducts = [] }) => {
  return (
    <section className="w-full space-y-6 pt-4">
      {/* Symmetrical Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Featured Products
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hand-Picked Catalog Items
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Verified merchant items with authentic warranty and rapid doorstep dispatch.
        </p>
      </div>

      {/* Symmetrical 4-Column Product Grid */}
      <ProductGrid initialProducts={initialProducts} />
    </section>
  );
};

export default HomeProduct;