"use client";

import { type FC } from "react";
import Script from "next/script";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./index.module.css";

type ContactSectionProps = SliceComponentProps<Content.ContactSectionSlice>;

const ContactSection: FC<ContactSectionProps> = ({ slice }) => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <SectionWrapper id={slice.primary.section_id || "contacto"} elevated>
      <div className={styles.headerSection} ref={headerRef}>
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
      </div>

      <div className={styles.card} ref={cardRef}>
        {/* Booking panel — Doctoralia widget */}
        <div className={styles.bookingPanel}>
          <a
            className="zl-facility-url"
            href="https://www.doctoralia.es/clinicas/multifido-fisioterapia-y-readaptacion"
            rel="nofollow"
            data-zlw-facility="multifido-fisioterapia-y-readaptacion"
            data-zlw-type="facility-big-with-saas-only"
            data-zlw-saas-only="true"
            data-zlw-a11y-title="Widget de reserva de citas médicas"
          >
            Reserve una cita
          </a>
          <Script
            id="zl-widget-s"
            src="https://platform.docplanner.com/js/widget.js"
            strategy="lazyOnload"
          />
        </div>

        {/* Map panel — middle */}
        <div className={styles.mapPanel}>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.8!2d-3.764!3d40.328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+Valdemoro+11%2C+28914+Legan%C3%A9s!5e0!3m2!1ses!2ses!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Multífido Fisioterapia en Google Maps"
          />
        </div>

        {/* Info panel — dark bg */}
        <div className={styles.info}>
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Dirección</h3>
            <div className={styles.infoText}>
              <PrismicRichText field={slice.primary.address} />
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Teléfono</h3>
            <a
              href={`tel:${slice.primary.phone}`}
              className={styles.infoLink}
            >
              {slice.primary.phone}
            </a>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Email</h3>
            <a
              href={`mailto:${slice.primary.email}`}
              className={styles.infoLink}
            >
              {slice.primary.email}
            </a>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Horario</h3>
            <p className={styles.hours}>{slice.primary.hours_weekday}</p>
            <p className={styles.hours}>{slice.primary.hours_saturday}</p>
          </div>

          {slice.primary.doctoralia_link && (
            <a
              href={(slice.primary.doctoralia_link as { url?: string }).url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.doctoralia}
            >
              Reservar en Doctoralia
            </a>
          )}

          <a
            href="https://maps.google.com/?q=Calle+Valdemoro+11,+28914+Legan%C3%A9s"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsButton}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Cómo llegar
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
