'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2,
  ShoppingBag,
  CreditCard,
  Truck,
  ArrowLeft,
  ShieldCheck,
  PackageCheck,
  AlertCircle
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const CheckoutPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [cartData, setCartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery',
    note: '',
  })

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || session.user.name || '',
        email: prev.email || session.user.email || '',
      }))
    }
  }, [session])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewaddtocart`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setCartData(Array.isArray(data) ? data.filter((item) => item && item.cartId) : [])
        }
      } catch (err) {
        console.error('Failed to load cart items for checkout:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const subtotal = (cartData || []).reduce((acc, item) => {
    if (!item?.cartId) return acc
    const price =
      item.cartId.saleprice != null ? item.cartId.saleprice : item.cartId.regularprice || 0
    return acc + Number(price) * Number(item.quantity || 1)
  }, 0)

  const tax = Math.round((subtotal * 10) / 100)
  const deliveryFee = cartData.length > 0 ? 150 : 0
  const grandTotal = subtotal + tax + deliveryFee

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage('Please fill in your name, phone number, and delivery address.')
      return
    }

    if (cartData.length === 0) {
      setErrorMessage('Your cart is empty. Add products before checking out.')
      return
    }

    setSubmitting(true)
    try {
      const orderItems = cartData.map((item) => ({
        product: item.cartId._id,
        name: item.cartId.name,
        price: item.cartId.saleprice != null ? item.cartId.saleprice : item.cartId.regularprice,
        quantity: item.quantity || 1,
      }))

      const payload = {
        productId: orderItems[0]?.product,
        items: orderItems,
        customerName: formData.name,
        customerEmail: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} ${formData.postalCode}`.trim(),
        paymentMethod: formData.paymentMethod,
        quantity: orderItems.reduce((acc, curr) => acc + curr.quantity, 0),
        total: grandTotal,
        note: formData.note,
        status: 'pending',
        clearCart: true,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/addorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok && (data.success || data.order)) {
        setOrderSuccess(data.order || { _id: Date.now().toString(), total: grandTotal })
        setCartData([])
      } else {
        setErrorMessage(data.error || 'Failed to place order. Please try again.')
      }
    } catch (err) {
      setErrorMessage('Network error occurred while submitting your order. Please check your connection.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Container className="py-20 text-center">
        <div className="animate-pulse space-y-4 max-w-md mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <p className="text-gray-500 mt-4">Preparing checkout...</p>
        </div>
      </Container>
    )
  }

  // Success view
  if (orderSuccess) {
    return (
      <Container className="py-16">
        <div className="max-w-2xl mx-auto bg-white border border-emerald-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-500/5 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mt-3 text-base">
            Thank you for shopping with us, <span className="font-semibold text-gray-800">{formData.name}</span>. Your order has been placed and is being processed.
          </p>

          <div className="my-8 p-6 bg-gray-50 rounded-2xl border text-left text-sm space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-medium text-gray-800">{orderSuccess._id || 'ORD-' + Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium text-gray-800">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Delivery Address:</span>
              <span className="font-medium text-gray-800">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between pt-1 text-base font-semibold text-gray-900">
              <span>Total Amount:</span>
              <span className="text-emerald-700">৳{orderSuccess.total || grandTotal}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/shop')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xs"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="px-8 py-6 rounded-2xl font-bold text-xs uppercase tracking-wider border-slate-200"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  // Empty cart view
  if (cartData.length === 0) {
    return (
      <Container className="py-20">
        <div className="max-w-md mx-auto text-center bg-white border border-slate-200/80 p-10 rounded-3xl shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
          <p className="text-slate-500 mt-2 mb-6 text-xs sm:text-sm">
            Add items to your shopping cart before proceeding to checkout.
          </p>
          <Button
            onClick={() => router.push('/shop')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs"
          >
            Explore Shop
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Cart
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4" /> Secure & Encrypted Checkout
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shipping & Payment Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b text-lg font-semibold text-gray-800">
                <Truck className="w-5 h-5 text-shop_dark_orange" />
                <span>Shipping & Delivery Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="h-11 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="h-11 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className="h-11 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                    Street Address *
                  </label>
                  <Input
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no, Street name, Apartment / Suite"
                    className="h-11 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                    City / Area *
                  </label>
                  <Input
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Dhaka"
                    className="h-11 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                    Postal Code
                  </label>
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="e.g. 1205"
                    className="h-11 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="note"
                    rows={2}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Special delivery instructions or gate code..."
                    className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 text-base font-black text-slate-900">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <span>Payment Method</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'Cash on Delivery',
                    title: 'Cash on Delivery (COD)',
                    desc: 'Pay safely in cash when your package arrives at your door.',
                  },
                  {
                    id: 'Credit / Debit Card',
                    title: 'Credit / Debit Card (Online)',
                    desc: 'Instant and secure payment with Visa, MasterCard, or Amex.',
                  },
                  {
                    id: 'bKash / Mobile Wallet',
                    title: 'bKash / Nagad / Rocket',
                    desc: 'Direct payment from your mobile financial service account.',
                  },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-start p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-bold text-slate-900">{method.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs sticky top-24">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 text-base font-black text-slate-900">
                <PackageCheck className="w-5 h-5 text-emerald-600" />
                <span>Order Summary ({cartData.length} item{cartData.length > 1 ? 's' : ''})</span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1 mb-5">
                {cartData.map((item) => {
                  const p = item.cartId
                  if (!p) return null
                  const price = p.saleprice != null ? p.saleprice : p.regularprice || 0
                  return (
                    <div key={item._id} className="py-3 flex items-center gap-3">
                      <div className="w-14 h-14 relative bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200/80">
                        {p.image?.[0] ? (
                          <Image
                            src={p.image[0]}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{p.name}</h4>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Qty: {item.quantity || 1} × ৳{price}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-slate-900">
                        ৳{price * (item.quantity || 1)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (10%)</span>
                  <span className="font-bold text-slate-900">৳{tax}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Standard Delivery</span>
                  <span className="font-bold text-slate-900">৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                  <span>Total Due</span>
                  <span className="text-emerald-700 text-xl font-black">৳{grandTotal}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xs transition-all cursor-pointer"
              >
                {submitting ? 'Placing Order...' : `Place Order • ৳${grandTotal}`}
              </Button>

              <div className="mt-4 text-center text-xs text-gray-400">
                By placing this order, you agree to our Terms of Service & Return Policy.
              </div>
            </div>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default CheckoutPage