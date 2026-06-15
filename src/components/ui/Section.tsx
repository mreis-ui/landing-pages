import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  pad = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  pad?: "default" | "tight" | "loose" | "none";
  id?: string;
}) {
  const padding =
    pad === "none"
      ? ""
      : pad === "tight"
        ? "py-14 sm:py-20"
        : pad === "loose"
          ? "py-24 sm:py-36"
          : "py-20 sm:py-28";
  return (
    <section id={id} className={cn(padding, className)}>
      {children}
    </section>
  );
}

/* Editorial heading block: mono eyebrow (+ optional index) + headline + lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  index,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  index?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-prose text-center" : "max-w-prose",
        className,
      )}
    >
      {(eyebrow || index) && (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {index && (
            <span className="font-mono text-sm text-brand-orange">{index}</span>
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}
      <h2 className="mt-4 text-balance text-3xl font-semibold text-ink-primary sm:text-4xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 text-lg leading-relaxed text-ink-secondary">{lede}</p>
      )}
    </div>
  );
}
