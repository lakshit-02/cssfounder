"use client";

import { MotionConfig, motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "section" | "article" | "ul" | "ol" | "li" | "span" | "p" | "h1" | "h2";

type BaseProps = {
  as?: Tag;
  children?: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  x = 0,
  y = 32,
  scale = 1,
  duration = 0.7,
  ...rest
}: BaseProps & { delay?: number; x?: number; y?: number; scale?: number; duration?: number }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  as = "div",
  children,
  className,
  delay = 0,
  stagger = 0.1,
  ...rest
}: BaseProps & { delay?: number; stagger?: number }) {
  const Component = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </Component>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function StaggerItem({ as = "div", children, className, ...rest }: BaseProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component className={className} variants={itemVariants} {...rest}>
      {children}
    </Component>
  );
}
