'use client';
import React, { useEffect, useRef } from 'react';
import Container from './Container';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';
import AuthPage from './AuthPage';
import { ShoppingCart, LayoutDashboard, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

const Header = () => {
  const cartCountRef = useRef(null);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API || "https://e-commerce-backend-multivandor.vercel.app"}/api/v1/product/viewaddtocart`
        );
        const cart = await data.json();
        if (cartCountRef.current) {
          cartCountRef.current.textContent = Array.isArray(cart) ? cart.length : 0;
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
    window.addEventListener('cart-updated', fetchCartCount);
    return () => window.removeEventListener('cart-updated', fetchCartCount);
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 text-slate-800 shadow-xs transition-all">
      <Container className="flex justify-between items-center h-20">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-4">
          <MobileMenu />
          <Logo />
        </div>

        {/* Center: Navigation Menu with Larger Readable Text */}
        <div className="hidden md:flex items-center justify-center">
          <HeaderMenu />
        </div>

        {/* Right: Dashboard Link, Cart, Auth */}
        <div className="flex items-center gap-3.5">
          <a
            href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://e-commerce-dashboard-multivandor-zm.vercel.app"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200/80 transition-all shadow-xs"
            title="Open Merchant Management Dashboard"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-600" />
            <span>Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <Link
            href="/cart"
            className="relative p-2.5 rounded-xl text-slate-800 hover:text-emerald-600 hover:bg-slate-50 transition-colors"
            title="View Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            <span
              ref={cartCountRef}
              className="absolute top-0 right-0 bg-emerald-600 text-white font-extrabold text-[11px] rounded-full w-5 h-5 flex items-center justify-center shadow-xs"
            >
              0
            </span>
          </Link>

          <AuthPage />
        </div>
      </Container>
    </header>
  );
};

export default Header;