'use client';
import React from "react";
import Logo from "./Logo";
import { categoriesData, quickLinksData } from "@/constant/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Container from "./Container";
import { ShieldCheck, Truck, RefreshCcw, Headphones } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 mt-16 text-slate-600 font-sans">
      {/* Features Ribbon */}
      <div className="border-b border-slate-200/80 bg-white py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Fast Delivery</h4>
                <p className="text-[11px] text-slate-500">Free shipping on select items</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Secure Payments</h4>
                <p className="text-[11px] text-slate-500">100% protected checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Easy Returns</h4>
                <p className="text-[11px] text-slate-500">30-day money back guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 border border-violet-200/60 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">24/7 Support</h4>
                <p className="text-[11px] text-slate-500">Dedicated merchant support</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Logo />
            <p className="text-xs text-slate-500 leading-relaxed">
              Cartify is your destination for quality products, curated collections, and effortless shopping with seamless order tracking.
            </p>
            <div className="pt-2">
              <a
                href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://e-commerce-dashboard-multivandor-zm.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Go to Merchant Dashboard →
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              {quickLinksData.map((item) => (
                <li key={item?.title}>
                  <Link
                    className="hover:text-emerald-600 transition-colors text-slate-600"
                    href={item?.href}
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-4">
              Featured Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {categoriesData.map((item) => (
                <li key={item?.title}>
                  <Link
                    className="hover:text-emerald-600 transition-colors text-slate-600"
                    href={`/category/${item?.href}`}
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Stay Connected
            </h3>
            <p className="text-xs text-slate-500">
              Subscribe to receive weekly updates, product arrivals, and exclusive coupons.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="bg-white border-slate-200 text-xs rounded-xl h-10"
                required
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl h-10 shadow-xs">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>

        <div className="py-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Cartify Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors">Support</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
