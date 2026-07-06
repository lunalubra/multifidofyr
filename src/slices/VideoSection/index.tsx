"use client";

import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { PrismicMedia } from "@/components/PrismicMedia/PrismicMedia";
import { Container } from "@/components/Container/Container";
import styles from "./index.module.css";

type VideoSectionProps = SliceComponentProps<Content.VideoSectionSlice>;

const VideoSection: FC<VideoSectionProps> = ({ slice }) => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>(slice.items.length, {
    staggerDelay: 200,
  });

  return (
    <section
      className={styles.section}
      id={slice.primary.section_id || "conocenos"}
      data-slice-type={slice.slice_type}
    >
      <Container>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>
            {slice.primary.eyebrow || "Conócenos"}
          </span>
          <div className={styles.heading}>
            <PrismicRichText field={slice.primary.heading} />
          </div>
          {slice.primary.description && (
            <div className={styles.description}>
              <PrismicRichText field={slice.primary.description} />
            </div>
          )}
        </div>

        <div className={styles.videoGrid} ref={gridRef}>
          {slice.items.map((item, i) => (
            <div key={i} className={styles.videoCard}>
              <div className={styles.videoFrame}>
                <PrismicMedia
                  image={slice.primary.poster_image}
                  video={item.video_file}
                  mode="player"
                  width={800}
                  height={450}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.video}
                />
              </div>
              {item.video_title && (
                <div className={styles.videoInfo}>
                  <span className={styles.videoIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.videoTitle}>{item.video_title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default VideoSection;
