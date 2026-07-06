"use client";

import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicMedia } from "@/components/PrismicMedia/PrismicMedia";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import styles from "./index.module.css";

type EquipmentSectionProps = SliceComponentProps<Content.EquipmentSectionSlice>;

const EquipmentSection: FC<EquipmentSectionProps> = ({ slice }) => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const listRef = useStaggerReveal<HTMLDivElement>(slice.items.length, {
    staggerDelay: 150,
  });

  return (
    <SectionWrapper id={slice.primary.section_id || "tecnologia"} elevated>
      <div className={styles.header} ref={headerRef}>
        <span className={styles.eyebrow}>
          {slice.primary.eyebrow || "Tecnología"}
        </span>
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
        {slice.primary.description && (
          <div className={styles.description}>
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
      </div>

      <div className={styles.list} ref={listRef}>
        {slice.items.map((item, i) => {
          const hasMedia =
            isFilled.image(item.equipment_image) ||
            isFilled.linkToMedia(item.equipment_video);
          return (
            <div
              key={i}
              className={styles.card}
              data-reverse={hasMedia && i % 2 === 1 ? "" : undefined}
              data-no-image={!hasMedia ? "" : undefined}
            >
              {hasMedia ? (
                <div className={styles.imageWrapper}>
                  <PrismicMedia
                    image={item.equipment_image}
                    video={item.equipment_video}
                    width={600}
                    height={400}
                    className={styles.image}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className={styles.imagePlaceholder} aria-hidden="true">
                  <span className={styles.placeholderLabel}>
                    {slice.primary.coming_soon_label || "Próximamente"}
                  </span>
                </div>
              )}
              <div className={styles.content}>
                <span className={styles.number} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.equipmentName}>{item.equipment_name}</h3>
                <div className={styles.equipmentDescription}>
                  <PrismicRichText field={item.equipment_description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default EquipmentSection;
