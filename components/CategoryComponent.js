import CategoryButton from "./CategoryButton"
import Container from "./Container"




export default async function CategoryComponent() {
    const data=await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewcategory`)
    const posts=await data.json()
    
    
  return (
    <div>
       <Container>
      <div className="bg-[#F8F9FA] py-5 shadow-md rounded-md shadow-shop_light_green/50">
       <ul  className="flex justify-center items-center gap-2 md:gap-4 lg:gap-6 list-none flex-wrap">
        
          {posts.map((item) => (
            
            <li key={item._id} className="relative group">
             <CategoryButton item={item}/> 
             <ul  className="absolute hidden group-hover:block z-50">
             { item.subcategoryList.map(items=>(                      
                      <li key={items._id} className='border border-shop_light_green shadow-md shadow-shop_light_green/50 cursor-pointer font-poppins bg-gray-50 py-1 px-3 sm:px-10 text-xs sm:text-sm hover:bg-shop_dark_green hover:text-white hover:scale-110 hoverEffect'>{items.name}</li>
                     
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
