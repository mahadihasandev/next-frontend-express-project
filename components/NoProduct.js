"use client";
import React from "react";
import { motion } from "motion/react";

const NoProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold"
          animate={{
            color: ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#ef4444"],
            y: [0, -10, 0],
          }}
          transition={{
            color: { duration: 4, repeat: Infinity },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          No Product Available
        </motion.h2>
        <motion.p
          className="text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Please check back later or try a different category.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NoProduct;
