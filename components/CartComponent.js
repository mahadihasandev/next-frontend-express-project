'use client'
import { CircleMinus, CirclePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { useSession, signIn} from "next-auth/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';


const CartComponent = ({cartData: initialCartData}) => {
  const [cartData, setCartData] = useState(initialCartData || [])
  const [refresh,setRefresh]=useState(false)
  const { data: session } = useSession()
 console.log(cartData)
 const router=useRouter()
let totalPrice=cartData.reduce((accumulator,currentItem)=>{
   return accumulator+=currentItem.cartId.saleprice?currentItem.cartId.saleprice*currentItem.quantity:currentItem.cartId.regularprice*currentItem.quantity
},0)
const tax=totalPrice*10/100
const finalPrice=totalPrice+tax+150

 const handleQuantity =(item,type)=>{
   setCartData(prevCartData => {
     const updatedCart = prevCartData.map(cartItem => {
       if (cartItem._id === item._id) {
         if (type === 'increment') {
           return { ...cartItem, quantity: cartItem.quantity + 1 };
         } else if (type === 'decrement') {
           const newQuantity = cartItem.quantity - 1;
           if (newQuantity <= 0) {
             // Remove the item if quantity becomes 0 or less
             return null;
           }
           return { ...cartItem, quantity: newQuantity };
         }
       }
       return cartItem;
     }).filter(item => item !== null); // Remove null items

     return updatedCart;
   });

   // Call the API after updating state
   fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/addtocart?type=${type}`,
   {
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       method: "POST",
       body: JSON.stringify(
       {
         cartId:item.cartId._id,      
         quantity:1,
       }
       )
   })
   .then(function(res){  
    })
   .catch(function(res){ console.log(res) })  
 }


  return (
    <div className='h-screen pt-8 shadow-md'>
    {session?!cartData.length>0?(<div className='flex justify-center items-center'><div className='flex flex-col justify-center items-center border p-10 w-96 shadow-lg shadow-shop_dark_orange rounded-lg'>
      <h1 className='text-2xl font-sans text-red-600 pb-10 text-center'>Cart is empty</h1>
      <p className='text-center pb-10 text-shop_dark_orange'>Click on the continue shopping button to add items to your cart.</p>
      <Button onClick={()=>router.push("/shop")} className='bg-shop_dark_orange text hover:bg-shop_dark_orange/90 hoverEffect'>Continue Shopping</Button>
    </div></div>):(<>
       <Table className='border shadow-lg'>
      <TableHeader>
        <TableRow>
            <TableHead>No.</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className='text-center'>Quantity</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Total</TableHead>    
        </TableRow>
      </TableHeader>
      <TableBody className='border shadow-lg p-5'>
        {
          cartData.map((item,index)=>(
           <TableRow key={item._id}>
          <TableCell>{index+1}</TableCell>
          <TableCell>
             {item.cartId&& <Image src={item.cartId?.image[0]} height={50} width={50} alt='image'/>}
            </TableCell>
          <TableCell className='text-xs md:text-base'>{item.cartId?.name}</TableCell>
          <TableCell >
            <div className='flex gap-2 justify-center'>
             <CircleMinus onClick={()=>(handleQuantity(item,"decrement"))} className='text-orange-600 ' />
            <div>{item.quantity}</div>            
            <CirclePlus onClick={()=>(handleQuantity(item,"increment"))} className='text-orange-600 ' />
            </div>
            </TableCell>           
          <TableCell className='text-xs md:text-base'>৳
            {item.cartId?.saleprice?item.cartId?.saleprice:item.cartId?.regularprice}
          </TableCell>         
          <TableCell className='text-xs md:text-base'>৳{item.cartId?.saleprice?item.cartId.saleprice*item.quantity:item.cartId?.regularprice*item.quantity}</TableCell>         
        </TableRow>     
          ))}

      </TableBody>
    </Table>
      <Table className='border shadow-lg mt-5'>
      <TableHeader>
        <TableRow>
          <TableHead>Retail Price</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Delivery</TableHead>
          <TableHead>Total price</TableHead>         
        </TableRow>
      </TableHeader>
      <TableBody>
           <TableRow >
          <TableCell>৳{totalPrice}</TableCell>
          <TableCell>৳{tax} </TableCell>
          <TableCell>৳150</TableCell>
          <TableCell className='font-bold '>৳{finalPrice}</TableCell>         
        </TableRow>
      </TableBody>
    </Table>
    <div className="flex justify-end mt-5">
    <Button onClick={()=>router.push("/checkout")} className='bg-shop_dark_orange text hover:bg-shop_dark_orange/90 hoverEffect'>Proceed to checkout</Button>
    </div>
    </>
    ):(<div className='flex flex-col justify-center items-center '>
      <div className='flex flex-col justify-center items-center border p-5 w-96 shadow-lg shadow-shop_dark_orange rounded-lg'>
        <h1 className='text-2xl font-sans text-shop_dark_orange pb-10 text-center'>
          Welcome to our shop</h1>
    <p className='text-lg font-sans text-shop_dark_gray pb-10 text-center'>
      Please sign in to continue shopping & spacial offers.</p>  
    <Button onClick={() => signIn()} className='bg-shop_dark_orange text hover:bg-shop_dark_orange/90 hoverEffect'>Sign In</Button>
    </div>
    </div>)}
       
    </div>
  )
}

export default CartComponent