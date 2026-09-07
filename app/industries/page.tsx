import { client } from "@/sanity/lib/client"
import { INDUSTRIES_PAGE_QUERY, type IndustriesPageData } from "@/sanity/lib/queries"
import { IndustriesPageClient } from "./industries-page-client"

export const revalidate = 60

export default async function IndustriesPage() {
  const industriesData = await client
    .fetch<IndustriesPageData | null>(INDUSTRIES_PAGE_QUERY)
    .catch(() => null)

  return <IndustriesPageClient industriesData={industriesData ?? undefined} />
}
