"use client"

import { motion } from "framer-motion"
import React from "react";
import { fadeInUp, smoothSpring, viewportOnce } from "@/lib/animations"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      transition={smoothSpring}
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </motion.section>
  )
}
