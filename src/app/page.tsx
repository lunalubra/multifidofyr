import { type Metadata } from "next";

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();
  // The clinic gallery images live in their own `gallery` singleton document
  // (keeps the home document under Prismic's per-document asset limit). It is
  // passed to slices via SliceZone context. `.catch` keeps the build working if
  // the document has not been created yet.
  const [home, gallery] = await Promise.all([
    client.getByUID("page", "home"),
    client.getSingle("gallery").catch(() => null),
  ]);

  // <SliceZone> renders the page's slices.
  return (
    <SliceZone
      slices={home.data.slices}
      components={components}
      context={{ gallery }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }]
    }
  };
}
