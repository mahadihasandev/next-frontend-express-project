'use client';
import Link from 'next/link';
import React from 'react';

export default function CategoryButton({ item }) {
  return (
    <Link href={`/category/${item.slug || item._id}`}>
      <button className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer whitespace-nowrap shadow-xs">
        {item.name}
      </button>
    </Link>
  );
}
