import { type ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import styles from "./SectionWrapper.module.css";

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
  elevated?: boolean;
  className?: string;
  noContainer?: boolean;
};

export function SectionWrapper({
  children,
  id,
  elevated = false,
  className,
  noContainer = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${elevated ? styles.elevated : ""} ${className ?? ""}`}
    >
      {noContainer ? children : <Container>{children}</Container>}
    </section>
  );
}
