import SingleProductPage from '@/components/SingleProductPage';
import React from 'react';

export const dynamic = 'force-dynamic';

const ProductPage = async ({ params }) => {
  const { slug } = await params;
  let product = null;
  const apiBase = process.env.NEXT_PUBLIC_API || 'https://e-commerce-backend-multivandor.vercel.app';

  try {
    const data = await fetch(`${apiBase}/api/v1/product/viewsingleproduct/${slug}`, {
      cache: 'no-store',
    });
    if (data.ok) {
      product = await data.json();
    }
  } catch (error) {
    console.warn(`Failed to fetch product for slug ${slug}:`, error.message);
  }

  return (
    <div>
      <SingleProductPage product={product} />
    </div>
  );
};

export default ProductPage;