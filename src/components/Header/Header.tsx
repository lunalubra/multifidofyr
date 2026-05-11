"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Quiénes Somos", href: "/#quienes-somos" },
  { label: "Equipo", href: "/#equipo" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <Container>
        <nav className={styles.nav} aria-label="Navegación principal">
          <Link href="/" className={styles.logo}>
            Multífido
          </Link>

          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="/#contacto" className={styles.cta}>
            Visítanos
          </a>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ""}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ""}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ""}`} />
          </button>
        </nav>
      </Container>

      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menú de navegación">
          <nav>
            <ul className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#contacto"
                  className={styles.mobileCta}
                  onClick={closeMenu}
                >
                  Visítanos
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
