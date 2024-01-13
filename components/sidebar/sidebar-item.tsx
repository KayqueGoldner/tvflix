"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";


import { cn } from "@/lib/utils";

const SidebarItem = ({
  href,
  label,
  className,
  closeSidebar
}: {
  href: string;
  label: string;
  className?: string;
  closeSidebar?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div 
      className={cn(
        "group sidebar-item transition",
        className,
        pathname === href && "active"
      )}
      onClick={closeSidebar}
    >
      <Link
        href={href}
        className={cn(
          "relative z-10 text-lg group-hover:text-white font-medium block leading-10 w-full transition duration-300",
          pathname === href ? "text-white" : "text-zinc-600"
        )}
      >
        {label}
      </Link>
    </div>
  );
}
 
export default SidebarItem;