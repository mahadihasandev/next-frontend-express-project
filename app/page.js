import Banner from "@/components/Banner";
import CategoryComponent from "@/components/CategoryComponent";
import Container from "@/components/Container";


export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-zinc-100">
      <Container >
        <CategoryComponent/>
        <Banner/>
      </Container>
    </div>
  );
}
