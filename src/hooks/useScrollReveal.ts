"use client";

import { useEffect, useRef, type RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      el.style.opacity = "1";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition =
      "opacity var(--duration-entrance, 600ms) var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)), transform var(--duration-entrance, 600ms) var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1))";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(
  itemCount: number,
  options: ScrollRevealOptions & { staggerDelay?: number } = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    once = true,
    staggerDelay = 80,
  } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const children = Array.from(container.children) as HTMLElement[];

    if (prefersReducedMotion) {
      children.forEach((child) => {
        child.style.opacity = "1";
      });
      return;
    }

    children.forEach((child) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(20px)";
      child.style.transition =
        "opacity var(--duration-entrance, 600ms) var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)), transform var(--duration-entrance, 600ms) var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1))";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * staggerDelay}ms`;
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          });
          if (once) observer.unobserve(container);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [itemCount, threshold, rootMargin, once, staggerDelay]);

  return ref;
}
