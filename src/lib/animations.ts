import { Transition, Variants } from "framer-motion"

// ========================================
// Spring Physics Configurations
// ========================================

export const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
} as const

export const smoothSpring = {
  type: "spring",
  stiffness: 300,
  damping: 35,
} as const

export const bouncy = {
  type: "spring",
  stiffness: 500,
  damping: 20,
} as const

export const gentle = {
  type: "spring",
  stiffness: 200,
  damping: 40,
} as const

// ========================================
// Common Animation Variants
// ========================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

// ========================================
// Hover & Interaction Variants
// ========================================

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
  hover: {
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  },
}

export const iconHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.9 },
}

export const colorTransition: Transition = {
  type: "tween",
  duration: 0.2,
  ease: "easeInOut",
}

// ========================================
// Continuous Animations
// ========================================

export const bounce: {
  y: number[]
  transition: { duration: number; repeat: number; ease: string }
} = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
}

export const spin: {
  rotate: number
  transition: { duration: number; repeat: number; ease: string }
} = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
  },
}

export const pulse: {
  scale: number[]
  transition: { duration: number; repeat: number; ease: string }
} = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
}

// ========================================
// Stagger Animations
// ========================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
}

// ========================================
// Complex Animations
// ========================================

export const slideInFromBottom: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothSpring,
  },
}

export const slideInFromTop: Variants = {
  initial: {
    opacity: 0,
    y: -50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothSpring,
  },
}

// ========================================
// Card & Project Animations
// ========================================

export const cardHover: Variants = {
  rest: {
    y: 0,
    transition: smoothSpring,
  },
  hover: {
    y: -8,
    transition: smoothSpring,
  },
}

export const projectCardHover: Variants = {
  rest: {
    y: 0,
    transition: smoothSpring,
  },
  hover: {
    y: -6,
    transition: smoothSpring,
  },
}

// ========================================
// Button & Link Animations
// ========================================

export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: spring,
  },
  tap: {
    scale: 0.98,
    transition: spring,
  },
}

export const linkHover: Variants = {
  rest: { x: 0 },
  hover: {
    x: 4,
    transition: spring,
  },
}

// ========================================
// Utility Functions
// ========================================

/**
 * Creates a delayed animation variant
 */
export function withDelay(variants: Variants, delay: number): Variants {
  const result: Variants = {}

  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = {
        ...value,
        transition: {
          ...(typeof value === 'object' && 'transition' in value ? value.transition : {}),
          delay,
        },
      }
    } else {
      result[key] = value
    }
  }

  return result
}

/**
 * Creates viewport configuration for scroll-triggered animations
 */
export const viewportOnce = {
  once: true,
  margin: "0px 0px -100px 0px",
  amount: 0.2,
} as const

export const viewportRepeat = {
  once: false,
  margin: "0px 0px -50px 0px",
  amount: 0.3,
} as const
