'use client';
import { CircleMinus, CirclePlus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Container from './Container';

const CartComponent = ({ cartData: initialCartData }) => {
  const [cartData, setCartData] = useState(initialCartData || []);
  const { data: session } = useSession();
  const router = useRouter();

  let totalPrice = (cartData || []).reduce((accumulator, currentItem) => {
    if (!currentItem?.cartId) return accumulator;
    const price =
      currentItem.cartId.saleprice != null
        ? currentItem.cartId.saleprice
        : currentItem.cartId.regularprice;
    return accumulator + Number(price || 0) * Number(currentItem.quantity || 1);
  }, 0);
  const tax = (totalPrice * 10) / 100;
  const finalPrice = totalPrice + tax + 150;

  const handleQuantity = (item, type) => {
    setCartData((prevCartData) => {
      const updatedCart = prevCartData
        .map((cartItem) => {
          if (cartItem._id === item._id) {
            if (type === 'increment') {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            } else if (type === 'decrement') {
              const newQuantity = cartItem.quantity - 1;
              if (newQuantity <= 0) {
                return null;
              }
              return { ...cartItem, quantity: newQuantity };
            }
          }
          return cartItem;
        })
        .filter((item) => item !== null);

      return updatedCart;
    });

    fetch(
      `${process.env.NEXT_PUBLIC_API}/api/v1/product/addtocart?type=${type}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          cartId: item.cartId._id,
          quantity: 1,
        }),
      }
    ).catch((err) => console.error(err));
  };

  return (
    <Container className="py-6 min-h-[calc(100vh-160px)]">
      {session ? (
        !cartData.length ? (
          <div className="flex justify-center items-center py-16">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-10 max-w-md w-full text-center shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore our catalog to add items to your shopping cart.
              </p>
              <Button
                onClick={() => router.push('/shop')}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs overflow-hidden">
              <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Shopping Cart</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  {cartData.length} {cartData.length > 1 ? 'items' : 'item'}
                </span>
              </h2>
              <div className="overflow-x-auto">
                <Table className="w-full text-left">
                  <TableHeader>
                    <TableRow className="bg-slate-50 border-b border-slate-200/80 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <TableHead className="py-3 px-4">No.</TableHead>
                      <TableHead className="py-3 px-4">Item</TableHead>
                      <TableHead className="py-3 px-4">Title</TableHead>
                      <TableHead className="py-3 px-4 text-center">Quantity</TableHead>
                      <TableHead className="py-3 px-4">Unit Price</TableHead>
                      <TableHead className="py-3 px-4 text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                    {(cartData || [])
                      .filter((item) => item && item.cartId)
                      .map((item, index) => {
                        const price =
                          item.cartId?.saleprice != null
                            ? item.cartId.saleprice
                            : item.cartId?.regularprice || 0;
                        return (
                          <TableRow key={item._id} className="hover:bg-slate-50/60 transition-colors">
                            <TableCell className="py-4 px-4 font-bold text-slate-400">{index + 1}</TableCell>
                            <TableCell className="py-4 px-4">
                              {item.cartId?.image?.[0] ? (
                                <Image
                                  src={item.cartId.image[0]}
                                  height={48}
                                  width={48}
                                  alt="image"
                                  className="w-12 h-12 rounded-xl object-cover border border-slate-200/80"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">
                                  No Img
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="py-4 px-4 font-bold text-slate-900">{item.cartId?.name}</TableCell>
                            <TableCell className="py-4 px-4">
                              <div className="flex gap-2.5 items-center justify-center">
                                <button
                                  onClick={() => handleQuantity(item, 'decrement')}
                                  className="p-1 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                                >
                                  <CircleMinus className="w-4 h-4" />
                                </button>
                                <span className="font-extrabold text-slate-900 w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantity(item, 'increment')}
                                  className="p-1 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                                >
                                  <CirclePlus className="w-4 h-4" />
                                </button>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-4 font-semibold text-slate-700">৳{price}</TableCell>
                            <TableCell className="py-4 px-4 font-extrabold text-emerald-700 text-right">
                              ৳{price * (item.quantity || 1)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Cart Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs max-w-md ml-auto space-y-3">
              <h3 className="text-base font-black text-slate-900 pb-2 border-b border-slate-100">
                Order Summary
              </h3>
              <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                <span>Estimated Tax (10%)</span>
                <span className="font-bold text-slate-900">৳{tax}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                <span>Standard Delivery</span>
                <span className="font-bold text-slate-900">৳150</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-3 border-t border-slate-200/80">
                <span>Total Amount</span>
                <span className="text-emerald-700">৳{finalPrice}</span>
              </div>
              <Button
                onClick={() => router.push('/checkout')}
                className="w-full mt-4 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center py-16">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-10 max-w-md w-full text-center shadow-xs space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Welcome to Cartify</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Please sign in to view your saved cart items and access member promotions.
            </p>
            <Button
              onClick={() => signIn()}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs"
            >
              Sign In to Continue
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CartComponent;