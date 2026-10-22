import DiscountComponent from '@/components/DiscountComponent';
import React from 'react';

export const dynamic = 'force-dynamic';

const page = async () => {
  let data = { discount: [] };
  try {
    const apiBase = process.env.NEXT_PUBLIC_API || 'https://e-commerce-backend-multivandor.vercel.app';
    const response = await fetch(`${apiBase}/api/v1/product/topdiscount`, { cache: 'no-store' });
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.warn('Failed to fetch topdiscount on server:', error.message);
  }

  return (
    <div>
      <DiscountComponent discountData={data} />
    </div>
  );
};

export default page;