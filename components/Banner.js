"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    async function BannerData() {
      try {
        let data = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/product/viewbanner`,
        );
        const bannerData = await data.json();
        setBanner(bannerData);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    BannerData();
  }, []);
  const plugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  return (
    <div>
      <Carousel
        className="w-full mt-2"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {banner.map((item, index) => (
            <CarouselItem key={item._id || index}>
              <div className="rounded-lg h-full w-full overflow-hidden flex items-center justify-center">
                <Link href={`/product/${item?.productSlug?.[0]}`}>
                  <Image
                    className="w-full h-full object-cover"
                    width={1300}
                    height={357}
                    alt={item.title || "banner image"}
                    src={item.image}
                    priority={index === 0}
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Banner;
