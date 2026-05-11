import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { BlogPost } from "./BlogPost";

type Params = { uid: string };

async function getPost(uid: string) {
  const client = createClient();
  const post = await client
    .getByUID("blog_post" as any, uid)
    .catch(() => notFound());
  return post as any;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid } = await params;
  const post = await getPost(uid);
  return <BlogPost post={post} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const post = await getPost(uid);

  return {
    title: `${asText(post.data.title)} | Blog Multífido`,
    description: post.data.excerpt || post.data.meta_description,
    openGraph: {
      title: post.data.meta_title || asText(post.data.title),
      description:
        post.data.excerpt || post.data.meta_description || undefined,
      images: post.data.featured_image?.url
        ? [{ url: post.data.featured_image.url }]
        : post.data.meta_image?.url
          ? [{ url: post.data.meta_image.url }]
          : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  try {
    const posts = await client.getAllByType("blog_post" as any);
    return posts.map((post) => ({ uid: post.uid }));
  } catch {
    // blog_post type may not exist in Prismic yet
    return [];
  }
}
