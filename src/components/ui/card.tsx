"use client"

import { motion } from "framer-motion"
import React from "react";
import { fadeInUp, smoothSpring, viewportOnce } from "@/lib/animations"

interface CardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Card({ children, className = "", delay = 0 }: CardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={viewportOnce}
      transition={{ ...smoothSpring, delay }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  )
}
