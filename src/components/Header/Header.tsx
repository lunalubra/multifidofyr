"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/Container/Container";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Quienes Somos", href: "#quienes-somos" },
  { label: "Equipo", href: "#equipo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
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
        <nav className={styles.nav} aria-label="Navegacion principal">
          <a href="/" className={styles.logo}>
            Multifido
          </a>

          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#donde-estamos" className={styles.cta}>
            Visitanos
          </a>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menu" : "Abrir menu de navegacion"}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ""}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ""}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ""}`} />
          </button>
        </nav>
      </Container>

      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menu de navegacion">
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
                  href="#donde-estamos"
                  className={styles.mobileCta}
                  onClick={closeMenu}
                >
                  Visitanos
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
