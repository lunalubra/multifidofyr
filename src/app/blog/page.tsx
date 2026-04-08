import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { BlogListing } from "./BlogListing";

export const metadata: Metadata = {
  title: "Blog | Multifido Fisioterapia & Readaptacion",
  description:
    "Articulos sobre fisioterapia, readaptacion deportiva, bienestar y prevencion de lesiones. Consejos de nuestros especialistas.",
};

export default async function BlogPage() {
  const client = createClient();

  let posts: any[] = [];
  try {
    posts = await client.getAllByType("blog_post" as any, {
      orderings: [
        { field: "my.blog_post.publication_date", direction: "desc" },
      ],
    });
  } catch {
    // blog_post type may not exist in Prismic yet
  }

  return <BlogListing posts={posts} />;
}
