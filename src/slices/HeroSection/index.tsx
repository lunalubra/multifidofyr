import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import styles from "./index.module.css";

type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  const bgUrl = slice.primary.background_image_url || "/images/clinic/sala-ejercicio.jpg";

  return (
    <section className={styles.hero} data-slice-type={slice.slice_type}>
      <div className={styles.imageContainer}>
        <Image
          src={bgUrl}
          alt="Clinica Multifido Fisioterapia"
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
        <div className={styles.tagline}>
          <PrismicRichText field={slice.primary.tagline} />
        </div>
        <div className={styles.actions}>
          {slice.primary.cta_label && (
            <a href="#contacto" className={styles.ctaPrimary}>
              {slice.primary.cta_label}
            </a>
          )}
          <a href="#quienes-somos" className={styles.ctaSecondary}>
            Conocenos
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
