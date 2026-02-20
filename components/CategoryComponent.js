"use client"
import CategoryButton from "./CategoryButton"
import Container from "./Container"
import Link from "next/link"
import { useState, useEffect } from 'react'




export default function CategoryComponent() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewcategory`)
                const fetchedPosts = await data.json()
                setPosts(fetchedPosts)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
                setPosts([])
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    if (loading) {
        return (
            <div>
                <Container>
                    <div className="bg-[#F8F9FA] py-5 shadow-lg rounded-md flex justify-center">
                        <p>Loading categories...</p>
                    </div>
                </Container>
            </div>
        )
    }

  return (
    <div>
       <div>
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
    </div>
    </div>
  )
}
