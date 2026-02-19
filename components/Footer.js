import React from "react";


import Logo from "./Logo";


import { categoriesData, quickLinksData } from "@/constant/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-black border-t mt-10">
      <Container>
        
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo className="" />
            <h1 className="text-white">
              Transform your space with AuraShop&apos;s thoughtfully selected
              furniture, crafted for comfort and charm.
            </h1>
           
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">
              Quick Links
              </h1>
              <ul className="space-y-3 mt-4">
                {
                  quickLinksData.map((item)=>(
                    <li key={item?.title}>
                      <Link className="hover:text-shop_dark_orange hoverEffect font-medium text-white" href={item?.href}>
                        {item?.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            
          </div>
          <div>
             <h1 className="text-white text-xl font-bold">
              Category
              </h1>
              <ul className="space-y-3 mt-4">
                {
                  categoriesData.map((item)=>(
                    <li key={item?.title}>
                      <Link className="hover:text-shop_dark_orange hoverEffect font-medium text-white" href={`/category/${item?.href}`}>
                        {item?.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
          </div>
          <div className="space-y-4">
            <h1 className="text-white font-bold text-xl">
                Newsletter
            </h1>
            <p className="mt-1 text-white">
              Subscribe to our Newsletter to receive updates and exclusive offer 
            </p>
            <form className="space-y-3">
              <Input placeholder="Enter your email" type="email" required/>
              <Button className="w-full bg-shop_dark_orange">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-white">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
