import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import styles from "./index.module.css";

type LocationMapProps = SliceComponentProps<Content.LocationMapSlice>;

const LocationMap: FC<LocationMapProps> = ({ slice }) => {
  const mapUrl =
    slice.primary.map_embed_url ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.8!2d-3.764!3d40.328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+Valdemoro+11%2C+28914+Legan%C3%A9s!5e0!3m2!1ses!2ses!4v1";

  return (
    <SectionWrapper id={slice.primary.section_id || "donde-estamos"}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          className={styles.map}
          src={mapUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicacion de Multifido Fisioterapia en Google Maps"
        />
      </div>

      <p className={styles.address}>
        Calle Valdemoro 11, 28914 Leganes, Madrid
      </p>
    </SectionWrapper>
  );
};

export default LocationMap;
