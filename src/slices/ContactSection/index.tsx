"use client";

import { type FC } from "react";
import Script from "next/script";
import { type Content, asLink } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./index.module.css";

const DEFAULT_FACILITY = "multifido-fisioterapia-y-readaptacion";
const DEFAULT_DOCTORALIA_URL =
  "https://www.doctoralia.es/clinicas/multifido-fisioterapia-y-readaptacion";
const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.8!2d-3.764!3d40.328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+Valdemoro+11%2C+28914+Legan%C3%A9s!5e0!3m2!1ses!2ses!4v1";
const DEFAULT_DIRECTIONS =
  "https://maps.google.com/?q=Calle+Valdemoro+11,+28914+Legan%C3%A9s";

type ContactSectionProps = SliceComponentProps<Content.ContactSectionSlice>;

const ContactSection: FC<ContactSectionProps> = ({ slice }) => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const facility = slice.primary.doctoralia_facility || DEFAULT_FACILITY;
  const widgetUrl = slice.primary.doctoralia_widget_url || DEFAULT_DOCTORALIA_URL;
  const mapEmbedUrl = slice.primary.map_embed_url || DEFAULT_MAP_EMBED;
  const directionsUrl = asLink(slice.primary.directions_link) || DEFAULT_DIRECTIONS;

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
            href={widgetUrl}
            rel="nofollow"
            data-zlw-facility={facility}
            data-zlw-type="facility-big-with-saas-only"
            data-zlw-saas-only="true"
            data-zlw-a11y-title="Widget de reserva de citas médicas"
          >
            {slice.primary.booking_label || "Reserve una cita"}
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
            src={mapEmbedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Multífido Fisioterapia en Google Maps"
          />
        </div>

        {/* Info panel — dark bg */}
        <div className={styles.info}>
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>
              {slice.primary.label_address || "Dirección"}
            </h3>
            <div className={styles.infoText}>
              <PrismicRichText field={slice.primary.address} />
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>
              {slice.primary.label_phone || "Teléfono"}
            </h3>
            <a href={`tel:${slice.primary.phone}`} className={styles.infoLink}>
              {slice.primary.phone}
            </a>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>
              {slice.primary.label_email || "Email"}
            </h3>
            <a
              href={`mailto:${slice.primary.email}`}
              className={styles.infoLink}
            >
              {slice.primary.email}
            </a>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>
              {slice.primary.label_hours || "Horario"}
            </h3>
            <p className={styles.hours}>{slice.primary.hours_weekday}</p>
            <p className={styles.hours}>{slice.primary.hours_saturday}</p>
          </div>

          {asLink(slice.primary.doctoralia_link) && (
            <a
              href={asLink(slice.primary.doctoralia_link) as string}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.doctoralia}
            >
              {slice.primary.doctoralia_label || "Reservar en Doctoralia"}
            </a>
          )}

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsButton}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            {slice.primary.directions_label || "Cómo llegar"}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
