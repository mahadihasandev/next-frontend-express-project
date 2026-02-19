"use client";
import React from "react";
import { RiNextjsLine } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { motion } from "motion/react";
import { BiLogoMongodb } from "react-icons/bi";
import { SiShadcnui } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import nextauth from "../assets/nextauth.svg"
import Image from "next/image";
import Link from "next/link";
const HomeTech = () => {
  const techData=[
            {
              name: "Next.js",
              desc: "React Framework",
              icon: <RiNextjsLine size={50}  />,
              href:"https://nextjs.org/"
            },
            {
              name: "Node.js",
              desc: "Express Framework",
              icon: <FaNodeJs size={50}  />,
              href:"https://nodejs.org/"
            },
            
            { name: "MongoDB", desc: "Database", icon: <BiLogoMongodb size={50}  />,
              href:"https://www.mongodb.com/" },
            { name: "Tailwind CSS", desc: "Styling", icon: <RiTailwindCssFill size={50}  />,
              href:"https://tailwindcss.com/" },
            { name: "NextAuth", desc: "Authentication", icon: <Image src={nextauth} alt="NextAuth" width={50} height={50} />,
              href:"https://next-auth.js.org/" },
            { name: "ShadCn", desc: "UI Components", icon: <SiShadcnui size={50}  />,
              href:"https://ui.shadcn.com/" },
          ]
  return (
    <div>
      <div className="my-16 text-center">
        <h3 className="text-2xl font-bold text-shop_dark_gray mb-8">
          Built With Modern Technology
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techData.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px #ef4a23",
              }}
              className="bg-white p-6 rounded-xl border  flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <a href={tech.href} className="flex flex-col items-center justify-center gap-2 group cursor-pointer">
              <div className="text-2xl">{tech.icon}</div>
              <p className="font-semibold text-shop_dark_blue group-hover:text-shop_dark_orange hoverEffect">
                {tech.name}
              </p>
              <p className="text-xs text-lightColor">{tech.desc}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTech;
