import Container from '@/components/Container'
import ShopComponent from '@/components/ShopComponent'
import React from 'react'

const ShopPage = async() => {  
  const categoryData= await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewcategory`);
  const category = await categoryData.json()
  const productData= await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewproduct`);
  const product = await productData.json()
 
  return (
    <Container>
      
      <ShopComponent category={category} product={product}/>
    </Container>
  )
}

export default ShopPage