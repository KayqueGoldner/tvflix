import Link from "next/link";

import { cn } from "@/lib/utils";

interface LinkBtnProps {
  children: React.ReactNode;
  href: string;
  target: "_blank" | "_parent" | "_self" | "_top";
  className?: string;
}

export const LinkBtn = ({
  children,
  href,
  target,
  className
}: LinkBtnProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-lg bg-darkRed text-white truncate px-3 leading-6 rounded-full overflow-hidden",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  )
}