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
import { useState, useEffect, useRef, useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Sparkles, ArrowRight } from "lucide-react";

const Banner = ({ initialBanners = [] }) => {
  // Cap at top 5 curated banners to prevent heavy network loading and lag
  const [banner, setBanner] = useState(
    Array.isArray(initialBanners) && initialBanners.length > 0
      ? initialBanners.slice(0, 5)
      : []
  );
  const [loading, setLoading] = useState(
    !initialBanners || initialBanners.length === 0
  );
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (initialBanners && initialBanners.length > 0) {
      setBanner(initialBanners.slice(0, 5));
      setLoading(false);
      return;
    }

    async function fetchBanners() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API || "http://localhost:8000"}/api/v1/product/viewbanner`
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        // Strictly limit to top 5 banners to keep page fast and smooth
        setBanner(list.slice(0, 5));
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, [initialBanners]);

  // Autoplay plugin configuration (4s delay with seamless loop)
  const plugin = useRef(
    Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // Track active slide index from Embla API
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const displayBanners = useMemo(() => (banner || []).slice(0, 5), [banner]);

  if (loading) {
    return (
      <div className="w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl bg-white border border-slate-200/80 flex items-center justify-center animate-pulse shadow-xs">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Loading promotions...
        </p>
      </div>
    );
  }

  if (!displayBanners || displayBanners.length === 0) {
    return (
      <div className="w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-200/80 p-8 md:p-16 flex flex-col justify-center text-white relative overflow-hidden shadow-xs">
        <div className="max-w-xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Featured Collection
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Elevate Your Everyday Essentials
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Discover curated quality products with verified merchant delivery and seamless checkout.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Explore Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          duration: 25,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="-ml-0">
          {displayBanners.map((item, index) => {
            const raw = item.image;
            const imgUrl = raw
              ? raw.startsWith("http")
                ? raw
                : `${process.env.NEXT_PUBLIC_API || "http://localhost:8000"}${raw.startsWith("/") ? "" : "/"}${raw}`
              : null;

            return (
              <CarouselItem key={item._id || index} className="pl-0">
                {/* STRICT SAME HEIGHT AND WIDTH HERO SLIDE */}
                <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs group">
                  <Link
                    href={
                      item?.productSlug
                        ? `/product/${item.productSlug}`
                        : "/shop"
                    }
                    className="block w-full h-full relative"
                  >
                    {imgUrl ? (
                      <Image
                        fill
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
                        alt={item.name || item.title || "Banner"}
                        src={imgUrl}
                        className="object-cover object-center w-full h-full group-hover:scale-102 transition-transform duration-700 ease-out transform-gpu will-change-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">
                        <Sparkles className="w-12 h-12" />
                      </div>
                    )}

                    {/* Gradient Overlay & Clean Text Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                      {item.name && (
                        <div className="max-w-xl space-y-2.5">
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                            Featured Deal
                          </span>
                          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md leading-tight">
                            {item.name}
                          </h2>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 drop-shadow-sm font-medium">
                              {item.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel Arrow Controls */}
        <div className="hidden sm:block">
          <CarouselPrevious className="left-4 bg-white/90 hover:bg-white text-slate-900 border-none shadow-md" />
          <CarouselNext className="right-4 bg-white/90 hover:bg-white text-slate-900 border-none shadow-md" />
        </div>

        {/* Interactive Dot Indicators & Slide Counter */}
        {displayBanners.length > 1 && (
          <div className="absolute bottom-4 right-6 sm:right-10 z-20 flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-xs">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {displayBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    current === idx
                      ? "w-6 h-2 bg-emerald-400"
                      : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            {/* Slide Index */}
            <span className="text-[11px] font-mono font-bold text-white/80 border-l border-white/20 pl-2">
              0{current + 1} / 0{displayBanners.length}
            </span>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Banner;
