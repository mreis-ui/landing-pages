import { cn } from "@/lib/cn";

/*
 * Long-form typographic container for legal / editorial pages.
 * Styles raw HTML children (h2/h3/p/ul) without @tailwindcss/typography.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-prose text-base leading-relaxed text-ink-secondary",
        "[&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink-primary",
        "[&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-ink-primary",
        "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-ink-muted",
        "[&_a]:font-medium [&_a]:text-brand-orange hover:[&_a]:text-brand-orange-hover",
        "[&_strong]:font-semibold [&_strong]:text-ink-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}
