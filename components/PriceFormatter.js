import { cn } from '@/lib/utils';
import React from 'react'

const PriceFormatter = ({amount,className}) => {
    const formattedPrice=new Number(amount).toLocaleString("en-US",{
        currency:"BDT",
        style:"currency",
        minimumFractionDigits:0,
    })
  return (
    <span className={cn("text-xs md:text-sm overflow-hidden font-bold text-darkColor",className)}>
        {formattedPrice}
    </span>
  )
}

export default PriceFormatter