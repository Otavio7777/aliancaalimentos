"use client";

import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Carrega apenas as features de animação usadas (reduz o JS do Framer Motion). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/**
 * Parallax leve: desloca os filhos conforme a rolagem da seção.
 * Os filhos continuam sendo renderizados no servidor.
 */
export function Parallax({
  children,
  distance = 60,
  rotateFrom,
  rotateTo,
  className,
}: {
  children: ReactNode;
  distance?: number;
  rotateFrom?: number;
  rotateTo?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -distance]);
  const rotate = useTransform(scrollYProgress, [0, 1], [rotateFrom ?? 0, reduce ? (rotateFrom ?? 0) : (rotateTo ?? rotateFrom ?? 0)]);
  return (
    <m.div ref={ref} style={{ y, rotate }} className={className}>
      {children}
    </m.div>
  );
}
