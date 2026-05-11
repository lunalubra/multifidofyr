"use client";

import Link from "next/link";
import { asText, type PrismicDocument } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Container } from "@/components/Container/Container";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import styles from "./page.module.css";

function getReadingTime(slices: any[]): number {
  let wordCount = 0;
  for (const slice of slices) {
    const content = slice.primary?.content;
    if (Array.isArray(content)) {
      for (const block of content) {
        if (block.text) wordCount += block.text.split(/\s+/).filter(Boolean).length;
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

type BlogListingProps = {
  posts: PrismicDocument[];
};

export function BlogListing({ posts }: BlogListingProps) {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const featuredRef = useScrollReveal<HTMLAnchorElement>();
  const gridHeaderRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>(
    Math.max(0, posts.length - 1),
    { staggerDelay: 100 },
  );

  if (posts.length === 0) {
    return (
      <section className={styles.page}>
        <Container>
          <div className={styles.pageHeader} ref={headerRef}>
            <h1 className={styles.pageTitle}>Blog</h1>
            <p className={styles.pageSubtitle}>
              Artículos sobre fisioterapia, readaptación y bienestar
            </p>
            <div className={styles.accentLine} />
          </div>
          <div className={styles.emptyState}>
            <p>Próximamente publicaremos nuevos artículos.</p>
          </div>
        </Container>
      </section>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <section className={styles.page}>
      <Container>
        <div className={styles.pageHeader} ref={headerRef}>
          <h1 className={styles.pageTitle}>Blog</h1>
          <p className={styles.pageSubtitle}>
            Artículos sobre fisioterapia, readaptación y bienestar
          </p>
          <div className={styles.accentLine} />
        </div>

        {/* Featured Post */}
        <Link
          href={`/blog/${featured.uid}`}
          className={styles.featured}
          ref={featuredRef}
        >
          <div className={styles.featuredImageWrap}>
            {featured.data.featured_image?.url ? (
              <PrismicNextImage
                field={featured.data.featured_image}
                className={styles.featuredImage}
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            ) : (
              <div className={styles.featuredImageFallback} />
            )}
          </div>
          <div className={styles.featuredContent}>
            {featured.data.category && (
              <span className={styles.badge}>{featured.data.category}</span>
            )}
            <h2 className={styles.featuredTitle}>
              {asText(featured.data.title)}
            </h2>
            {featured.data.excerpt && (
              <p className={styles.featuredExcerpt}>{featured.data.excerpt}</p>
            )}
            <div className={styles.meta}>
              {featured.data.author && (
                <span className={styles.metaAuthor}>{featured.data.author}</span>
              )}
              {featured.data.publication_date && (
                <span>{formatDate(featured.data.publication_date)}</span>
              )}
              <span>{getReadingTime(featured.data.slices)} min de lectura</span>
            </div>
          </div>
        </Link>

        {/* Grid */}
        {rest.length > 0 && (
          <>
            <div className={styles.gridHeader} ref={gridHeaderRef}>
              <span className={styles.gridLabel}>Todos los artículos</span>
              <div className={styles.gridLine} />
            </div>

            <div className={styles.grid} ref={gridRef}>
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.uid}`}
                  className={styles.card}
                >
                  <div className={styles.cardImageWrap}>
                    {post.data.featured_image?.url ? (
                      <PrismicNextImage
                        field={post.data.featured_image}
                        className={styles.cardImage}
                        sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={styles.cardImageFallback} />
                    )}
                    {post.data.category && (
                      <span className={styles.cardBadge}>
                        {post.data.category}
                      </span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>
                      {asText(post.data.title)}
                    </h3>
                    {post.data.excerpt && (
                      <p className={styles.cardExcerpt}>{post.data.excerpt}</p>
                    )}
                    <div className={styles.cardDivider} />
                    <div className={styles.cardMeta}>
                      <span>
                        {formatDate(post.data.publication_date)}
                      </span>
                      <span>
                        {getReadingTime(post.data.slices)} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
