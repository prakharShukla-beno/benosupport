import { forwardRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type PageCTASectionProps = {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}

export const PageCTASection = forwardRef<HTMLElement, PageCTASectionProps>(
  function PageCTASection({ children, className, innerClassName }, ref) {
    return (
      <section
        ref={ref}
        className={cn("bg-white px-6 py-12 lg:px-12 lg:py-16", className)}
      >
        <div className="mx-auto max-w-[1300px]">
          <div
            className={cn(
              "rounded-2xl bg-[#072448] px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20",
              innerClassName
            )}
          >
            {children}
          </div>
        </div>
      </section>
    )
  }
)

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-xl bg-button px-7 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-button-hover"

const outlineBtnClass =
  "inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 text-[14px] font-bold text-white transition-colors hover:border-white/50 hover:bg-white/5"

type PageCTAButtonProps = {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
}

export function PageCTAPrimaryButton({
  children,
  className,
  href,
  onClick,
  target,
  rel,
}: PageCTAButtonProps) {
  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={cn(primaryBtnClass, className)}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(primaryBtnClass, className)}
    >
      {children}
    </button>
  )
}

export function PageCTAOutlineButton({
  children,
  className,
  href,
  onClick,
  target,
  rel,
}: PageCTAButtonProps) {
  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={cn(outlineBtnClass, className)}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(outlineBtnClass, className)}
    >
      {children}
    </button>
  )
}
