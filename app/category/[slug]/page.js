'use client'
import CategoryGrid from "@/components/CategoryPageComponent";
import Container from "@/components/Container";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';



const CategoryPage = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewcategory`);
        const data = await response.json();
        const foundCategory = data.find((item) => item.slug === slug);
        setCategory(foundCategory);
      } catch (error) {
        console.error('Failed to fetch category:', error);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  if (loading) {
    return (
      <Container className="h-screen py-10">
        <div className="flex justify-center items-center">
          <p>Loading category...</p>
        </div>
      </Container>
    );
  }

  if (!category) {
    return (
      <Container className="h-screen py-10">
        <div className="flex flex-col items-center justify-center shadow-lg py-5 px-52 rounded-lg">
          <h1 className="text-2xl font-bold text-shop_dark_gray">Category not found</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container className="h-screen py-10">
      <div className="flex flex-col items-center justify-center shadow-lg py-5 px-52 rounded-lg">
        <h1 className="text-2xl font-bold text-shop_dark_gray">{category?.name}</h1>
        <p className="text-sm text-shop_dark_gray">Get Your Desired Product from {category?.name}!</p>
      </div>
      <CategoryGrid category={category}/>
    </Container>
  );
};

export default CategoryPage;
