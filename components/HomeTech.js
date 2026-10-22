"use client";

import { RiNextjsLine } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { motion } from "motion/react";
import { BiLogoMongodb } from "react-icons/bi";
import { SiShadcnui } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import nextauth from "../assets/nextauth.svg";
import Image from "next/image";
import { Cpu } from "lucide-react";

const HomeTech = () => {
  const techData = [
    {
      name: "Next.js",
      desc: "App Router & SSR",
      icon: <RiNextjsLine size={36} />,
      href: "https://nextjs.org/",
    },
    {
      name: "Node.js",
      desc: "Express Microservices",
      icon: <FaNodeJs size={36} />,
      href: "https://nodejs.org/",
    },
    {
      name: "MongoDB",
      desc: "Distributed Atlas DB",
      icon: <BiLogoMongodb size={36} />,
      href: "https://www.mongodb.com/",
    },
    {
      name: "Tailwind CSS",
      desc: "Utility-First Styling",
      icon: <RiTailwindCssFill size={36} />,
      href: "https://tailwindcss.com/",
    },
    {
      name: "NextAuth",
      desc: "Secure OAuth2 & JWT",
      icon: <Image src={nextauth} alt="NextAuth" width={36} height={36} />,
      href: "https://next-auth.js.org/",
    },
    {
      name: "ShadCn",
      desc: "Radix UI Primitives",
      icon: <SiShadcnui size={36} />,
      href: "https://ui.shadcn.com/",
    },
  ];

  return (
    <section className="w-full space-y-6 pt-4">
      {/* Symmetrical Section Header (Strict 3 Colors) */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          Architecture & Reliability
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Powered By Modern Engineering
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          High-performance distributed stack built for low latency and high availability.
        </p>
      </div>

      {/* Symmetrical 6-Column Grid with Equal Height Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {techData.map((tech, index) => (
          <motion.a
            key={tech.name}
            href={tech.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="h-44 w-full bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col items-center justify-center text-center group hover:border-emerald-500 hover:shadow-lg transition-all duration-300 shadow-xs cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors mb-2.5">
              {tech.icon}
            </div>
            <p className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              {tech.name}
            </p>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">{tech.desc}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default HomeTech;
