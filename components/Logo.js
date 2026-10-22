import Link from 'next/link';
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Logo = ({ className = '' }) => {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
        <ShoppingBag className="w-5 h-5" />
      </div>
      <div className="flex items-center">
        <span className="text-2xl font-black tracking-tight text-slate-900">
          Carti<span className="text-emerald-600">fy</span>
        </span>
        <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-full ml-2">
          Store
        </span>
      </div>
    </Link>
  );
};

export default Logo;