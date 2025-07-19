"use client"

import { motion } from "framer-motion"
import React from "react";

interface CardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Card({ children, className = "", delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  )
}
