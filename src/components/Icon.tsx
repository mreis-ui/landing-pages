import {
  Calendar,
  ClipboardList,
  BellRing,
  Stamp,
  LineChart,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/site";

const map: Record<IconName, LucideIcon> = {
  calendar: Calendar,
  clipboard: ClipboardList,
  "bell-ring": BellRing,
  stamp: Stamp,
  "line-chart": LineChart,
  boxes: Boxes,
};

export function ModuleIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const C = map[name];
  return <C className={className} strokeWidth={1.5} aria-hidden />;
}
