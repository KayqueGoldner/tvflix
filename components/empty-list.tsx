import { Clapperboard, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyListProps {
  icon?: LucideIcon;
  className?: string;
}

export const EmptyList = ({
  icon: Icon = Clapperboard,
  className,
}: EmptyListProps) => {
  return (
    <div className={cn(
      "w-full h-full flex flex-col items-center justify-center gap-y-5",
      className
    )}>
      <Icon size={50} />
    </div>
  )
}