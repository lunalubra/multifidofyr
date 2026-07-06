"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import {
  asImageSrc,
  isFilled,
  type ImageField,
  type LinkToMediaField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type PrismicMediaProps = {
  /** Rendered as the image when no video is set; used as the video poster otherwise. */
  image: ImageField;
  /** Optional video (link-to-media). When filled it takes over the image slot. */
  video?: LinkToMediaField;
  /**
   * "ambient" (default): autoplays muted in a loop, behaving like a moving
   * image. "player": native controls, no autoplay — for explicit video UI.
   */
  mode?: "ambient" | "player";
  /** Rendered when neither the video nor the image is filled. */
  fallback?: ReactNode;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
};

const FILL_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

/**
 * Renders a Prismic media slot that editors can fill with an image or a video.
 * Every image on the site has a sibling link-to-media field in its slice
 * model; pass both fields here instead of using PrismicNextImage directly.
 */
export function PrismicMedia({
  image,
  video,
  mode = "ambient",
  fallback = null,
  className,
  width,
  height,
  fill,
  priority,
  loading,
  sizes,
}: PrismicMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambient = mode === "ambient";
  const videoUrl = video && isFilled.linkToMedia(video) ? video.url : null;

  // React does not always serialize the `muted` attribute server-side, so set
  // it via the DOM before playing; also honor prefers-reduced-motion.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !ambient) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        el.pause();
      } else {
        el.muted = true;
        el.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [ambient, videoUrl]);

  if (videoUrl) {
    const alt = (isFilled.image(image) && image.alt) || null;
    return (
      <video
        ref={videoRef}
        className={className}
        style={fill ? FILL_STYLE : undefined}
        width={width}
        height={height}
        src={videoUrl}
        poster={asImageSrc(image) ?? undefined}
        autoPlay={ambient}
        muted={ambient}
        loop={ambient}
        controls={!ambient}
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={alt ?? undefined}
        aria-hidden={!alt && ambient ? true : undefined}
      />
    );
  }

  if (isFilled.image(image)) {
    return (
      <PrismicNextImage
        field={image}
        className={className}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading={loading}
        sizes={sizes}
        fallbackAlt=""
      />
    );
  }

  return <>{fallback}</>;
}
