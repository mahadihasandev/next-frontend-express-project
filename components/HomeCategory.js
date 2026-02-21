"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const HomeCategory = () => {
    const [category, setCategory] = useState([]);
     
    
    
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewcategory`);
            const data = await response.json();
            setCategory(data);
        };
        fetchCategory();
    }, []);
  return (
    <div className='flex flex-col shadow-md md:pb-5 rounded-lg items-center justify-center md:my-5'>
        <div className='flex flex-col items-center justify-center shadow-lg py-5 md:px-96 px-5 rounded-lg my-3 md:my-5'> 
            <h1 className='md:text-2xl font-bold text-shop_dark_gray'>Featured Category</h1>
            <p className='text-xs text-center px-2 md:text-sm text-shop_dark_orange'>Get Your Desired Product from Featured Category!</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4'>
            {category?.slice(0, 8)?.map((item) => (
                <div key={item._id}>
                    <Link href={`/category/${item?.slug}`}>
                        <div className='bg-white shadow-lg md:m-5 rounded-lg p-3 md:hover:scale-105 hoverEffect'>
                            <Image
                                src={item?.productList[0]?.image[0]}
                                alt={item?.name}
                                width={200}
                                height={200}
                                className="w-full md:h-48 md:object-cover rounded-t-lg hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            <h1 className='text-center font-sans text-lg font-bold'>{item?.name}</h1>
                        </div>
                        
                    </Link>
                </div>
            ))}
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default HomeCategory