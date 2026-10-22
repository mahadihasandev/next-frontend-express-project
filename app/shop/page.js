import Container from '@/components/Container';
import ShopComponent from '@/components/ShopComponent';
import React from 'react';

export const dynamic = 'force-dynamic';

const ShopPage = async () => {
  let category = [];
  let product = [];
  const apiBase = process.env.NEXT_PUBLIC_API || 'https://e-commerce-backend-multivandor.vercel.app';

  try {
    const [catRes, prodRes] = await Promise.all([
      fetch(`${apiBase}/api/v1/product/viewcategory`, { cache: 'no-store' }),
      fetch(`${apiBase}/api/v1/product/viewproduct`, { cache: 'no-store' }),
    ]);
    if (catRes.ok) category = await catRes.json();
    if (prodRes.ok) product = await prodRes.json();
  } catch (error) {
    console.warn('Failed to fetch shop data on server:', error.message);
  }

  return (
    <Container>
      <ShopComponent
        category={Array.isArray(category) ? category : []}
        product={Array.isArray(product) ? product : []}
      />
    </Container>
  );
};

export default ShopPage;