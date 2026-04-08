import Link from "next/link";
import { Container } from "@/components/Container/Container";
import styles from "./Footer.module.css";

const navLinks = [
  { label: "Quienes Somos", href: "/#quienes-somos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Equipo", href: "/#equipo" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaHeading}>
              Tu recuperacion empieza aqui
            </h2>
            <p className={styles.ctaText}>
              Cuidamos de ti con un enfoque personalizado y profesional
            </p>
          </div>
          <a href="/#contacto" className={styles.ctaButton}>
            Pide tu cita
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logo}>Multifido</span>
            <p className={styles.description}>
              Clinica de fisioterapia y readaptacion deportiva en Leganes,
              Madrid. Especialistas en prevencion y rehabilitacion de lesiones.
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Navegacion</h3>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Horario</h3>
            <p className={styles.hours}>Lun&ndash;Vie: 10:00&ndash;14:00 y 16:00&ndash;20:00</p>
            <p className={styles.hours}>Sab: 09:00&ndash;13:00</p>

            <h3 className={styles.columnTitle} style={{ marginTop: "var(--space-6)" }}>
              Contacto
            </h3>
            <ul className={styles.linkList}>
              <li>
                <a href="tel:604940941" className={styles.link}>
                  604 940 941
                </a>
              </li>
              <li>
                <a href="mailto:multifidofyr@gmail.com" className={styles.link}>
                  multifidofyr@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Encuentranos</h3>
            <span className={styles.address}>
              Calle Valdemoro 11, 28914 Leganes, Madrid
            </span>
            <div className={styles.social}>
              <a
                href="https://www.instagram.com/multifido_fyr/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram de Multifido"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/34604940941"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp de Multifido"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; 2026 Multifido Fisioterapia &amp; Readaptacion. Todos los derechos reservados.
          </p>
          <div className={styles.legal}>
            <Link href="/politica-de-privacidad" className={styles.legalLink}>Politica de Privacidad</Link>
            <Link href="/politica-de-cookies" className={styles.legalLink}>Politica de Cookies</Link>
            <Link href="/aviso-legal" className={styles.legalLink}>Aviso Legal</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
