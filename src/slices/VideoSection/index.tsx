import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { SectionWrapper } from "@/components/SectionWrapper/SectionWrapper";
import styles from "./index.module.css";

type VideoSectionProps = SliceComponentProps<Content.VideoSectionSlice>;

const VideoSection: FC<VideoSectionProps> = ({ slice }) => {
  return (
    <SectionWrapper id={slice.primary.section_id || "conocenos"}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Conocenos</span>
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
        {slice.primary.description && (
          <div className={styles.description}>
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
      </div>

      <div className={styles.videoGrid}>
        {slice.items.map((item, i) => (
          <div key={i} className={styles.videoWrapper}>
            {item.video_title && (
              <h3 className={styles.videoTitle}>{item.video_title}</h3>
            )}
            <video
              className={styles.video}
              controls
              preload="metadata"
              playsInline
              poster="/images/clinic/recepcion-bienvenida.jpg"
            >
              <source src={item.video_url || ""} type="video/mp4" />
              Tu navegador no soporta la reproduccion de video.
            </video>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default VideoSection;
