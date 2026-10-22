import Banner from "@/components/Banner";
import CategoryComponent from "@/components/CategoryComponent";
import Container from "@/components/Container";
import HomeCategory from "@/components/HomeCategory";
import HomeProduct from "@/components/HomeProduct";
import HomeTech from "@/components/HomeTech";

export default async function Home() {
  const api = process.env.NEXT_PUBLIC_API || "http://localhost:8000";

  let banners = [];
  let categories = [];
  let products = [];

  try {
    const [bRes, cRes, pRes] = await Promise.all([
      fetch(`${api}/api/v1/product/viewbanner`, { next: { revalidate: 60 } }),
      fetch(`${api}/api/v1/product/viewcategory`, { next: { revalidate: 60 } }),
      fetch(`${api}/api/v1/product/viewproduct`, { next: { revalidate: 60 } }),
    ]);

    if (bRes.ok) banners = await bRes.json();
    if (cRes.ok) categories = await cRes.json();
    if (pRes.ok) products = await pRes.json();
  } catch (error) {
    console.error("Server-side initial data fetch failed, fallback to client fetch:", error);
  }

  return (
    <div className="bg-slate-50/60 font-sans min-h-screen pt-1.5 pb-10">
      <Container className="space-y-5">
        <CategoryComponent initialCategories={categories} />
        <Banner initialBanners={banners} />
        <HomeTech />
        <HomeCategory initialCategories={categories} />
        <HomeProduct initialProducts={products} />
      </Container>
    </div>
  );
}
