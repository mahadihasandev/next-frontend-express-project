import React from 'react';
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';

const PriceView = ({ price, discount, className }) => {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <PriceFormatter amount={price} className="text-emerald-700 font-extrabold" />
      {price && discount ? (
        <PriceFormatter
          className="line-through font-normal text-slate-400 text-[11px]"
          amount={price + discount}
        />
      ) : null}
    </div>
  );
};

export default PriceView;