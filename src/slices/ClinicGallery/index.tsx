"use client";

import { type FC, useState, useEffect, useCallback } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Container } from "@/components/Container/Container";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import styles from "./index.module.css";

/**
 * The gallery images live in a separate `gallery` singleton document (so the
 * home page document stays under Prismic's per-document asset limit). The page
 * route fetches that document and passes it to slices via SliceZone context.
 */
export type GalleryContext = { gallery: Content.GalleryDocument | null };

type ClinicGalleryProps = SliceComponentProps<
  Content.ClinicGallerySlice,
  GalleryContext
>;

const ClinicGallery: FC<ClinicGalleryProps> = ({ slice, context }) => {
  const items = context.gallery?.data.images ?? [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>(items.length, {
    staggerDelay: 60,
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % items.length : null
        );
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + items.length) % items.length : null
        );
    },
    [selectedIndex, items.length]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleKeyDown]);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  if (items.length === 0) return null;

  return (
    <section
      id={slice.primary.section_id || "instalaciones"}
      className={styles.section}
    >
      <Container>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>
            {slice.primary.eyebrow || "Instalaciones"}
          </span>
          <div className={styles.heading}>
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {items.map((item, i) => {
            const alt =
              (isFilled.image(item.image) && item.image.alt) || "imagen";
            return (
              <button
                key={i}
                className={styles.imageButton}
                onClick={() => setSelectedIndex(i)}
                aria-label={`Ver ${alt} en pantalla completa`}
              >
                <PrismicNextImage
                  field={item.image}
                  width={600}
                  height={450}
                  className={styles.image}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  fallbackAlt=""
                />
              </button>
            );
          })}
        </div>
      </Container>

      {selectedItem && selectedIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-label="Galería de imágenes"
          aria-modal="true"
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setSelectedIndex(null)}
            aria-label="Cerrar galería"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                (selectedIndex - 1 + items.length) % items.length
              );
            }}
            aria-label="Imagen anterior"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className={styles.lightboxImageWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <PrismicNextImage
              field={selectedItem.image}
              width={1200}
              height={900}
              className={styles.lightboxImage}
              sizes="90vw"
              priority
              fallbackAlt=""
            />
          </div>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                (selectedIndex + 1) % items.length
              );
            }}
            aria-label="Imagen siguiente"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className={styles.lightboxCounter}>
            {selectedIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicGallery;
