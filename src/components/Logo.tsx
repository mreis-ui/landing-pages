import Image from "next/image";
import { cn } from "@/lib/cn";

/*
 * Official Flowbyte Systems brand mark ("flow" pinwheel) + the product
 * wordmark "Werkstatt ONE". The mark file ships in two variants:
 *   logo-mark.svg        navy + orange — for light backgrounds (default)
 *   logo-white-orange    white + orange — for dark backgrounds (inverted)
 */
export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={inverted ? "/logo-white-orange.png" : "/logo-mark.svg"}
        alt="Flowbyte Systems"
        width={28}
        height={28}
        priority
        className="h-7 w-7"
      />
      <span
        className={cn(
          "text-[15px] font-semibold tracking-tight",
          inverted ? "text-white" : "text-ink-primary",
        )}
      >
        Werkstatt&nbsp;ONE
      </span>
    </span>
  );
}
