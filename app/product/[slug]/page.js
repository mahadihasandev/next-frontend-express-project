import SingleProductPage from '@/components/SingleProductPage';
import React from 'react'

const ProductPage = async ({params}) => {
    const{ slug} = await params
    console.log(slug);
     let data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewsingleproduct/${slug}`)
  let posts = await data.json()
  console.log(posts);
  
    
  return (
    <div>
      <SingleProductPage product={posts}/>
    </div>
  )
}

export default ProductPage