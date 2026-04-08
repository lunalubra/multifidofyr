"use client";

import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import styles from "./index.module.css";

const pillarIcons = [
  <svg key="v" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  <svg key="f" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg key="e" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  <svg key="a" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
];

type AboutSectionProps = SliceComponentProps<Content.AboutSectionSlice>;

const AboutSection: FC<AboutSectionProps> = ({ slice }) => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>(slice.items.length, {
    staggerDelay: 120,
  });

  return (
    <SectionWrapper
      id={slice.primary.section_id || "quienes-somos"}
      elevated
    >
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>Sobre Nosotros</span>
          <div className={styles.heading}>
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div className={styles.description}>
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {slice.items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardAccent} aria-hidden="true" />
              <div className={styles.iconWrapper}>
                {pillarIcons[i] || pillarIcons[0]}
              </div>
              <h3 className={styles.pillarTitle}>{item.pillar_title}</h3>
              <div className={styles.pillarDescription}>
                <PrismicRichText field={item.pillar_description} />
              </div>
            </div>
          ))}
        </div>
    </SectionWrapper>
  );
};

export default AboutSection;
