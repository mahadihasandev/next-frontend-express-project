import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 min-h-64 gap-3 bg-white border border-slate-200/80 rounded-3xl w-full my-6 shadow-xs">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
        Loading Products...
      </span>
    </div>
  );
};

export default Loader;