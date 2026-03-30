import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import styles from "./index.module.css";

type EquipmentSectionProps = SliceComponentProps<Content.EquipmentSectionSlice>;

const EquipmentSection: FC<EquipmentSectionProps> = ({ slice }) => {
  return (
    <SectionWrapper id={slice.primary.section_id || "tecnologia"} elevated>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Tecnologia</span>
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
        {slice.primary.description && (
          <div className={styles.description}>
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {slice.items.map((item, i) => (
          <div key={i} className={styles.card}>
            {item.equipment_image_url && (
              <div className={styles.imageWrapper}>
                <Image
                  src={item.equipment_image_url}
                  alt={item.equipment_name || "Equipamiento clinico"}
                  width={400}
                  height={267}
                  className={styles.image}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <div className={styles.content}>
              <h3 className={styles.equipmentName}>{item.equipment_name}</h3>
              <div className={styles.equipmentDescription}>
                <PrismicRichText field={item.equipment_description} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default EquipmentSection;
