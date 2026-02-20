import DiscountComponent from '@/components/DiscountComponent';
import React from 'react'

const page = async () => {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/topdiscount`);
        const data = await response.json();
        
        
  return (
    <div>
        <DiscountComponent discountData={data}/>
    </div>
  )
}

export default page