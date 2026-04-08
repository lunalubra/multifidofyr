"use client";

import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { Container } from "@/components/Container/Container";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import styles from "./index.module.css";

type TeamSectionProps = SliceComponentProps<Content.TeamSectionSlice>;

const TeamSection: FC<TeamSectionProps> = ({ slice }) => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>(slice.items.length, {
    staggerDelay: 120,
  });

  return (
    <section
      id={slice.primary.section_id || "equipo"}
      className={styles.section}
    >
      <Container>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>Nuestro Equipo</span>
          <div className={styles.heading}>
            <PrismicRichText field={slice.primary.heading} />
          </div>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {slice.items.map((member, i) => {
            const initials = (member.name || "")
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("");

            return (
              <div key={i} className={styles.card}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatar} aria-hidden="true">
                    {initials}
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  {member.credentials && (
                    <span className={styles.badge}>{member.credentials}</span>
                  )}
                  <div className={styles.bio}>
                    <PrismicRichText field={member.bio} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
