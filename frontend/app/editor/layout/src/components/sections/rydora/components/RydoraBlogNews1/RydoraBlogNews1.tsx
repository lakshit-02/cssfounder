"use client";

import { AutomotiveImage as Image } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { AutomotiveLink as Link } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { ArrowRight } from "lucide-react";
import { blogs, type BlogPost } from "@/app/editor/layout/src/components/sections/blog/rydoraBlogs";
import { useAutomotivePathname } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { useOptionalPreview } from "@/app/editor/layout/src/components/context/PreviewContext";
import { Reveal, Stagger, StaggerItem } from "@/app/editor/layout/src/components/sections/rydora/addons/motion";

function openRydoraBlogCard(post: { slug?: string; title?: string }) {
  const slug = String(post.slug || "").trim();
  try {
    sessionStorage.setItem(
      "ai-builder-open-manager-item:Blogs",
      JSON.stringify({
        href: slug ? `#page-blog-${slug}` : "",
        slug,
        title: post.title || "",
      }),
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent("ai-builder-open-manager", {
      detail: { manager: "Blogs", cardOnly: true, preservePage: true },
    }),
  );
}

interface BlogCard extends BlogPost {
  hidden?: boolean;
}

interface BlogNewsData {
  badge: string;
  heading: { main: string; highlight: string };
  description: string;
  cta: { label: string; href: string };
  readMore: string;
  posts?: BlogCard[];
}

export default function BlogSection({
  data,
  limit,
  categorySlug,
}: {
  data?: BlogNewsData;
  limit?: number;
  categorySlug?: string;
}) {
  const path = useAutomotivePathname();
  const preview = useOptionalPreview();
  if (!data) return null;

  const source: BlogCard[] =
    Array.isArray(data.posts) && data.posts.length ? data.posts : blogs;
  let posts = source.filter((post) => post?.hidden !== true);
  let postLimit = limit;
  if (postLimit == null && path === "/") postLimit = 3;

  if (categorySlug) {
    posts = posts.filter((b) => b.category.toLowerCase().replace(/\s+/g, '-') === categorySlug);
  }

  if (postLimit) {
    posts = posts.slice(0, postLimit);
  }

  return (
    <section
      id="blogs"
      className="w-full bg-[#fbfbfa] py-14 sm:py-16 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#c85a17]" />
              <span className="text-xs font-bold tracking-wider text-[#c85a17]">
                {data.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#111827] tracking-tight leading-tight">
              {data.heading.main}{" "}
              <span className="text-[#c85a17]">{data.heading.highlight}</span>
            </h2>

            <p className="mt-3 text-sm text-[#6b7280] leading-relaxed max-w-xl">
              {data.description}
            </p>
          </div>

          {postLimit && postLimit < blogs.length && (
            <Link
              href={data.cta.href}
              className="group/link inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-[#c85a17]"
            >
              {data.cta.label}
              <ArrowRight className="w-4 h-4 transition group-hover/link:translate-x-1" />
            </Link>
          )}
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7" stagger={0.12}>
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
            <article
              className="group/card h-full cursor-pointer bg-white border border-[#f3eee7] rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(120,60,20,0.06)] hover:shadow-[0_14px_34px_rgba(120,60,20,0.12)] transition-shadow duration-300 flex flex-col"
              onClickCapture={(event) => {
                const live = Boolean(
                  document.querySelector("[data-editor-live-surface]"),
                );
                if (!live || preview?.isPreview) return;
                event.preventDefault();
                event.stopPropagation();
                openRydoraBlogCard(post);
              }}
            >
              <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-sm text-center min-w-[58px]">
                  <span className="block text-xl font-extrabold text-[#c85a17] leading-tight">
                    {post.day}
                  </span>
                  <span className="block text-[10px] font-semibold text-[#111827] leading-none mt-0.5">
                    {post.monthYear}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="inline-block bg-[#fbebe3] text-[#c85a17] text-[11px] font-bold px-2.5 py-1 rounded-md mb-3 tracking-wide">
                    {post.category}
                  </span>

                  <h3 className="text-lg font-bold text-[#111827] leading-snug group-hover/card:text-[#c85a17] transition-colors duration-200">
                    <Link href={"/blog/" + post.slug}>{post.title}</Link>
                  </h3>

                  <p className="mt-2.5 text-[13px] text-[#6b7280] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="mt-5 pt-2">
                  <Link
                    href={"/blog/" + post.slug}
                    className="inline-flex items-center gap-2 border-b-2 border-[#c85a17]/60 pb-0.5 text-xs font-bold text-[#c85a17] hover:gap-3 transition-all duration-200"
                    onClick={(event) => {
                      const live = Boolean(
                        document.querySelector("[data-editor-live-surface]"),
                      );
                      if (live && !preview?.isPreview) {
                        event.preventDefault();
                        event.stopPropagation();
                        openRydoraBlogCard(post);
                        return;
                      }
                      if (live) {
                        event.preventDefault();
                        event.stopPropagation();
                        const slug = String(post.slug || "").trim();
                        if (!slug) return;
                        window.dispatchEvent(
                          new CustomEvent("ai-builder-view-master-detail", {
                            detail: { master: "blog", slug },
                          }),
                        );
                      }
                    }}
                  >
                    {data.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
