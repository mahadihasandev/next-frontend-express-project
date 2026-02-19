import CategoryGrid from "@/components/CategoryPageComponent";
import Container from "@/components/Container";



const CategoryPage = async ({ params }) => {

  const response = await fetch("http://localhost:8000/api/v1/product/viewcategory", {
    cache: "no-store"
  });

  const data = await response.json();

 const { slug } = await params;
 
 
  const category = data.find((item) => item.slug === slug);
  

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
