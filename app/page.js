import Banner from "@/components/Banner";
import CategoryComponent from "@/components/CategoryComponent";
import Container from "@/components/Container";
import HomeCategory from "@/components/HomeCategory";
import HomeProduct from "@/components/HomeProduct";
import HomeTech from "@/components/HomeTech";
;


export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-zinc-100">
      <Container >
        <CategoryComponent/>
        <Banner/>
        <HomeTech/>
        <HomeCategory/>
        <HomeProduct/>
      </Container>
    </div>
  );
}
