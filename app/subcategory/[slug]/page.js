'use client'
import Container from "@/components/Container";
import SubCategoryGrid from "@/components/SubCategoryGrid";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';



const SubCategoryPage = () => {
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewsubcategory`);
        const data = await response.json();
        const foundSubcategory = data.find((item) => item.slug === slug);
        setSubcategory(foundSubcategory);
      } catch (error) {
        console.error('Failed to fetch subcategory:', error);
        setSubcategory(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchSubcategory();
    }
  }, [slug]);

  if (loading) {
    return (
      <Container className="h-screen py-10">
        <div className="flex justify-center items-center">
          <p>Loading subcategory...</p>
        </div>
      </Container>
    );
  }

  if (!subcategory) {
    return (
      <Container className="h-screen py-10">
        <div className="flex flex-col items-center justify-center shadow-lg py-5 px-52 rounded-lg">
          <h1 className="text-2xl font-bold text-shop_dark_gray">Subcategory not found</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container className="h-screen py-10">
      <div className="flex flex-col items-center justify-center shadow-lg py-5 px-52 rounded-lg">
        <h1 className="text-2xl font-bold text-shop_dark_gray">{subcategory?.name}</h1>
        <p className="text-sm text-shop_dark_gray">Get Your Desired Product from {subcategory?.name}!</p>
      </div>
      <SubCategoryGrid subcategory={subcategory}/>
    </Container>
  );
};

export default SubCategoryPage;
