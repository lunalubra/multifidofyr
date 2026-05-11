"use client";

import { type FC, useState, useEffect, useCallback } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import { Container } from "@/components/Container/Container";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import styles from "./index.module.css";

type ClinicGalleryProps = SliceComponentProps<Content.ClinicGallerySlice>;

const ClinicGallery: FC<ClinicGalleryProps> = ({ slice }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>(slice.items.length, {
    staggerDelay: 60,
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % slice.items.length : null
        );
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev !== null
            ? (prev - 1 + slice.items.length) % slice.items.length
            : null
        );
    },
    [selectedIndex, slice.items.length]
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

  const selectedItem =
    selectedIndex !== null ? slice.items[selectedIndex] : null;

  return (
    <section
      id={slice.primary.section_id || "instalaciones"}
      className={styles.section}
    >
      <Container>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>Instalaciones</span>
          <div className={styles.heading}>
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {slice.items.map((item, i) => (
            <button
              key={i}
              className={styles.imageButton}
              onClick={() => setSelectedIndex(i)}
              aria-label={`Ver ${item.alt_text || "imagen"} en pantalla completa`}
            >
              <Image
                src={item.image_url || "/images/clinic/recepcion-arte.jpg"}
                alt={item.alt_text || "Instalaciones de Multífido"}
                width={600}
                height={450}
                className={styles.image}
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </button>
          ))}
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
                (selectedIndex - 1 + slice.items.length) % slice.items.length
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
            <Image
              src={
                selectedItem.image_url || "/images/clinic/recepcion-arte.jpg"
              }
              alt={selectedItem.alt_text || "Instalaciones de Multífido"}
              width={1200}
              height={900}
              className={styles.lightboxImage}
              sizes="90vw"
              priority
            />
          </div>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                (selectedIndex + 1) % slice.items.length
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
            {selectedIndex + 1} / {slice.items.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicGallery;
