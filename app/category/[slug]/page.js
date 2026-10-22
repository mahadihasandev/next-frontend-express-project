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
      <Container className="py-16">
        <div className="flex flex-col items-center justify-center bg-white border border-slate-200/80 p-10 rounded-3xl shadow-xs max-w-md mx-auto text-center space-y-3">
          <h1 className="text-2xl font-black text-slate-900">Department Not Found</h1>
          <p className="text-xs text-slate-500">The requested category could not be located in our catalog.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-center text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
          Department Collection
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{category?.name}</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md">
          Browse verified products and models listed under {category?.name}.
        </p>
      </div>
      <CategoryGrid category={category}/>
    </Container>
  );
};

export default CategoryPage;
