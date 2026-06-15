import { TrendingUp, Clock, Gauge, Circle } from "lucide-react";
import { cn } from "@/lib/cn";
import { dashboardKpis } from "@/lib/site";

/*
 * A *real* rendered product UI — not a screenshot, not an AI image.
 * This is the honest, premium way to show the dashboard: live components
 * styled exactly like the app.
 */

const bars = [62, 48, 80, 71, 95, 58, 30]; // Mo–So
const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const orders = [
  { kennz: "DEL-AB 123", kunde: "M. Albers", status: "In Arbeit", tone: "info" },
  { kennz: "OL-KR 88", kunde: "S. König", status: "Wartet auf Teil", tone: "warn" },
  { kennz: "WST-T 4", kunde: "P. Thiel", status: "Fertig", tone: "ok" },
  { kennz: "DEL-MZ 7", kunde: "L. Mertens", status: "Heute fällig", tone: "warn" },
];

const toneText: Record<string, string> = {
  ok: "text-status-success",
  warn: "text-status-warning",
  info: "text-status-info",
};

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line-strong bg-surface-elevated shadow-lg",
        className,
      )}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-sunken px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <div className="ml-3 flex-1">
          <div className="inline-flex items-center gap-2 rounded bg-surface-elevated px-3 py-1 font-mono text-2xs text-ink-muted">
            <Circle className="h-2 w-2 fill-status-success text-status-success" />
            demo.flowbytesystems.com
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Dashboard</p>
          <p className="font-mono text-2xs text-ink-muted">KW 25 · Live</p>
        </div>

        {/* KPI tiles */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {dashboardKpis.map((k, i) => (
            <div
              key={k.label}
              className="rounded-md border border-line bg-surface p-3"
            >
              <div className="flex items-center gap-1.5 text-ink-muted">
                {i === 0 && <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.5} />}
                {i === 1 && <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />}
                {i === 2 && <Gauge className="h-3.5 w-3.5" strokeWidth={1.5} />}
                <span className="text-2xs leading-tight">{k.label}</span>
              </div>
              <p className="mt-2 font-mono text-xl font-semibold tracking-tight text-ink-primary">
                {k.value}
              </p>
              <p className={cn("mt-0.5 text-2xs", toneText[k.tone])}>{k.delta}</p>
            </div>
          ))}
        </div>

        {/* chart + orders */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-surface p-3">
            <p className="text-2xs text-ink-muted">Auslastung / Woche</p>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {bars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-full rounded-sm",
                      i === 4 ? "bg-brand-orange" : "bg-line-strong",
                    )}
                    style={{ height: `${h}%` }}
                  />
                  <span className="font-mono text-[9px] text-ink-muted">
                    {days[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-line bg-surface p-3">
            <p className="text-2xs text-ink-muted">Offene Aufträge</p>
            <ul className="mt-2 divide-y divide-line">
              {orders.map((o) => (
                <li
                  key={o.kennz}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="font-mono text-2xs text-ink-primary">
                    {o.kennz}
                  </span>
                  <span className="truncate px-2 text-2xs text-ink-muted">
                    {o.kunde}
                  </span>
                  <span className={cn("text-2xs font-medium", toneText[o.tone])}>
                    {o.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
