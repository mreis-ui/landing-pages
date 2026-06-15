import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ModuleIcon } from "@/components/Icon";
import type { Module } from "@/lib/site";
import { cn } from "@/lib/cn";

export function ModuleCard({
  module,
  index,
  className,
}: {
  module: Module;
  index: number;
  className?: string;
}) {
  return (
    <Link
      href={`/funktionen/${module.slug}`}
      className={cn(
        "group relative flex flex-col rounded-lg border border-line bg-surface-elevated p-6 transition-colors hover:border-line-strong",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-surface text-ink-primary transition-colors group-hover:border-brand-orange group-hover:text-brand-orange">
          <ModuleIcon name={module.icon} className="h-5 w-5" />
        </span>
        <span className="font-mono text-sm text-ink-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink-primary">
        {module.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">
        {module.short}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-primary transition-colors group-hover:text-brand-orange">
        Mehr erfahren
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </span>
    </Link>
  );
}
