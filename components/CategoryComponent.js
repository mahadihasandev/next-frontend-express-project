import CategoryButton from "./CategoryButton"
import Container from "./Container"
import Link from "next/link"




export default async function CategoryComponent() {
    const data=await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewcategory`)
    const posts=await data.json()
   
    
  return (
    <div>
       <Container>
      <div className="bg-[#F8F9FA] py-5 shadow-lg rounded-md">
       <ul  className="flex justify-center items-center gap-2 md:gap-4 lg:gap-6 list-none flex-wrap">
        
          {posts.map((item) => (
            
            <li key={item._id} className="relative group">
             <CategoryButton item={item}/> 
             <ul  className="absolute hidden group-hover:block z-50">
             { item.subcategoryList.map(items=>( 
              <Link href={`/subcategory/${items.slug}`} key={items._id} className="block">                     
                      <li className='border border-shop_dark_orange shadow shadow-shop_dark_orange rounded-md font-semibold text-shop_dark_gray cursor-pointer font-poppins bg-gray-50 py-1 px-3 sm:px-10 text-xs sm:text-sm hover:scale-105 ease-in-out duration-200 transition-all'>{items.name}</li>
               </Link>
                     ))}
                    
                </ul> 
              
            </li>
            
          ))}
           </ul>
       
      </div>
    </Container>
    </div>
  )
}
