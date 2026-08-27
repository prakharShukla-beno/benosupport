import { INDUSTRY_GRID_ITEMS } from "@/lib/industries-grid-data"

export function IndustriesSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="type-label font-semibold section-label-light">
            Industries We Serve
          </span>
          <h2 className="mt-2 text-balance type-heading font-bold text-primary">
            Industries We Empower Through Technology
          </h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-secondary">
            We help startups, SMBs, and enterprises modernize operations,
            improve efficiency, strengthen security, and accelerate digital
            transformation across diverse industries.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {INDUSTRY_GRID_ITEMS.map((industry) => (
            <div
              key={industry.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-accent"
            >
              <industry.icon className="size-7 text-accent" />
              <span className="text-sm font-medium text-primary">
                {industry.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
