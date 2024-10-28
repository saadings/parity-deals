import { Globe2Icon } from "lucide-react";

export function BrandLogo() {
  return (
    <span className="flex flex-shrink-0 items-center gap-2 text-lg font-semibold">
      <Globe2Icon className="size-8" />
      <span>Parity Deals</span>
    </span>
  );
}
