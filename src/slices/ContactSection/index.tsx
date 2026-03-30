"use client";

import { type FC, useState } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import styles from "./index.module.css";

type ContactSectionProps = SliceComponentProps<Content.ContactSectionSlice>;

const ContactSection: FC<ContactSectionProps> = ({ slice }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent("Consulta desde la web");
    const body = encodeURIComponent(
      `Nombre: ${data.get("name")}\nTelefono: ${data.get("phone")}\nEmail: ${data.get("email")}\n\nMensaje:\n${data.get("message")}`
    );
    window.location.href = `mailto:${slice.primary.email || "multifidofyr@gmail.com"}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <SectionWrapper id={slice.primary.section_id || "contacto"} elevated>
      <div className={styles.headerSection}>
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
      </div>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-name" className={styles.label}>
              Nombre
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={styles.input}
              placeholder="Tu nombre..."
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-email" className={styles.label}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className={styles.input}
                placeholder="tu@email.com..."
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-phone" className={styles.label}>
                Telefono
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={styles.input}
                placeholder="600 000 000..."
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="contact-message" className={styles.label}>
              Mensaje
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              className={styles.textarea}
              placeholder="Cuentanos en que podemos ayudarte..."
              rows={5}
            />
          </div>

          <button type="submit" className={styles.submit}>
            {submitted ? "Mensaje preparado" : "Enviar Mensaje"}
          </button>
        </form>

        <div className={styles.info}>
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Direccion</h3>
            <div className={styles.infoText}>
              <PrismicRichText field={slice.primary.address} />
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Telefono</h3>
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
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
