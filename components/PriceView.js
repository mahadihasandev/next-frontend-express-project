import React from 'react'
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';


const PriceView = ({price,discount,className}) => {
  return (   
        <div className={cn('flex items-center gap-2',className)}>            
                <PriceFormatter amount={price} className='text-shop_dark_blue'/>
                {price&&discount&&<PriceFormatter className='line-through font-normal text-shop_light_text' amount={price+discount} />}           
        </div>   
  )
}

export default PriceView