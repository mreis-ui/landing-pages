import {
  Calendar,
  ClipboardList,
  BellRing,
  Stamp,
  LineChart,
  Boxes,
  Landmark,
  Calculator,
  TrendingUp,
  ScanLine,
  MessagesSquare,
  Users,
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
  landmark: Landmark,
  calculator: Calculator,
  "trending-up": TrendingUp,
  "scan-line": ScanLine,
  "messages-square": MessagesSquare,
  users: Users,
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
