import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { ALL_POSTS_QUERY, type PostListItem } from "@/sanity/lib/queries"

function formatDate(date?: string) {
  if (!date) return null
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export async function InsightsSection() {
  let posts: PostListItem[] = []

  try {
    const allPosts = await client.fetch<PostListItem[]>(ALL_POSTS_QUERY)
    posts = allPosts.slice(0, 3)
  } catch {
    posts = []
  }

  if (posts.length === 0) return null

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="type-label font-semibold section-label-light">
            Blog &amp; Resources
          </span>
          <h2 className="mt-2 text-balance type-heading font-bold text-primary">
            AI, Engineering &amp; Technology Insights
          </h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-secondary">
            Explore expert perspectives on the future of AI transformation and
            engineering best practices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = post.mainImage
              ? urlFor(post.mainImage).width(800).height(450).fit("crop").url()
              : null
            const published = formatDate(post.publishedAt)

            return (
              <article
                key={post.slug}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(7,36,72,0.10)]"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-video overflow-hidden bg-[#e8eefc]"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#072448] to-[#0a3a73] text-sm font-semibold tracking-[0.18em] text-white/70">
                      BENO SUPPORT
                    </div>
                  )}
                </Link>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  {published ? (
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <CalendarDays className="size-3.5" />
                      <time dateTime={post.publishedAt}>{published}</time>
                    </div>
                  ) : null}
                  <h3 className="text-base font-semibold text-primary">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-button"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt ? (
                    <p className="line-clamp-3 flex-1 type-body text-secondary">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-button transition-colors hover:opacity-80"
                  >
                    Read Article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
