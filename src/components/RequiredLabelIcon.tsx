import { cn } from "@/lib/utils";
import { AsteriskIcon } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

const RequiredLabelIcon = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AsteriskIcon>) => {
  return (
    <AsteriskIcon
      {...props}
      className={cn("inline size-3 align-top text-destructive", className)}
    />
  );
};

export default RequiredLabelIcon;
