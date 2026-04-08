"use client";

import Link from "next/link";
import { asText, type PrismicDocument } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { Container } from "@/components/Container/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./page.module.css";

function getReadingTime(slices: any[]): number {
  let wordCount = 0;
  for (const slice of slices) {
    const content = slice.primary?.content;
    if (Array.isArray(content)) {
      for (const block of content) {
        if (block.text)
          wordCount += block.text.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200));
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const articleComponents: JSXMapSerializer = {
  heading2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
  heading3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
  heading4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
  paragraph: ({ children }) => <p>{children}</p>,
  preformatted: ({ children }) => (
    <pre className={styles.pre}>
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  listItem: ({ children }) => <li>{children}</li>,
  oListItem: ({ children }) => <li>{children}</li>,
  list: ({ children }) => <ul className={styles.ul}>{children}</ul>,
  oList: ({ children }) => <ol className={styles.ol}>{children}</ol>,
  image: ({ node }) => (
    <figure className={styles.figure}>
      <img src={node.url} alt={node.alt ?? ""} className={styles.articleImage} />
      {node.alt && <figcaption className={styles.figcaption}>{node.alt}</figcaption>}
    </figure>
  ),
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className={styles.link}>
      {children}
    </PrismicNextLink>
  ),
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code className={styles.code}>{children}</code>;
    }
    return <span>{children}</span>;
  },
};

type BlogPostProps = {
  post: PrismicDocument;
};

export function BlogPost({ post }: BlogPostProps) {
  const heroRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const bodyRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  const hasImage = !!post.data.featured_image?.url;

  return (
    <article>
      {/* Hero */}
      <div
        className={`${styles.hero} ${!hasImage ? styles.heroNoImage : ""}`}
        ref={heroRef}
      >
        {hasImage && (
          <PrismicNextImage
            field={post.data.featured_image}
            className={styles.heroImage}
            priority
            sizes="100vw"
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Container>
            {post.data.category && (
              <span className={styles.heroBadge}>{post.data.category}</span>
            )}
            <h1 className={styles.heroTitle}>{asText(post.data.title)}</h1>
            <div className={styles.heroMeta}>
              {post.data.author && (
                <span className={styles.heroAuthor}>{post.data.author}</span>
              )}
              {post.data.publication_date && (
                <span>{formatDate(post.data.publication_date)}</span>
              )}
              <span>{getReadingTime(post.data.slices)} min de lectura</span>
            </div>
          </Container>
        </div>
      </div>

      {/* Article Body */}
      <div className={styles.articleWrap} ref={bodyRef}>
        <div className={styles.article}>
          {post.data.slices.map((slice: any, i: number) => {
            if (slice.slice_type === "rich_text" && slice.primary?.content) {
              return (
                <PrismicRichText
                  key={i}
                  field={slice.primary.content}
                  components={articleComponents}
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.articleFooter}>
        <Container>
          <div className={styles.footerSep} />
          <Link href="/blog" className={styles.backLink}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver al blog
          </Link>
        </Container>
      </div>
    </article>
  );
}
