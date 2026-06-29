"use client";

import { type FC, useEffect, useRef } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import styles from "./index.module.css";

type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  const bgUrl =
    slice.primary.background_image_url || "/images/clinic/sala-ejercicio.jpg";
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      if (!imageRef.current) return;
      const y = window.scrollY;
      imageRef.current.style.transform = `translateY(${y * 0.2}px) scale(${1 + y * 0.0002})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero} data-slice-type={slice.slice_type}>
      <div className={styles.imageContainer} ref={imageRef}>
        <Image
          src={bgUrl}
          alt="Clínica Multífido Fisioterapia"
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.tagline}>
          <PrismicRichText field={slice.primary.tagline} />
        </div>
        <div className={styles.actions}>
          {slice.primary.cta_label && (
            <a href="#contacto" className={styles.ctaPrimary}>
              {slice.primary.cta_label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
          <a href="#quienes-somos" className={styles.ctaSecondary}>
            Conócenos
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
};

export default HeroSection;
