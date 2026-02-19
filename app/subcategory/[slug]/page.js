
import Container from "@/components/Container";
import SubCategoryGrid from "@/components/SubCategoryGrid";



const SubCategoryPage = async ({ params }) => {

  const response = await fetch("http://localhost:8000/api/v1/product/viewsubcategory", {
    cache: "no-store"
  });

  const data = await response.json();

 const { slug } = await params;
 
 
  const subcategory = data.find((item) => item.slug === slug);
  

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
