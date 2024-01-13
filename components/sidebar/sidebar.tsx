import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import SidebarItem from "./sidebar-item";

interface SidebarProps {
  className?: string;
  closeSidebar?: () => void;
}

const Sidebar = ({
  className,
  closeSidebar
}: SidebarProps) => {
  return (
    <div 
      className={cn(
        "h-full flex flex-col px-5 pt-5 sm:pt-8 bg-outline overflow-y-auto",
        className
      )}
    >
      <SidebarItem 
        href="/" 
        label="Home"
        className="mb-5"
        closeSidebar={closeSidebar}
      />
      <div>
        <h1 className="text-xl mb-3 font-semibold">Categorias</h1>
        <div className="flex flex-col gap-y-3">
          <SidebarItem
            href="/navegar/filmes"
            label="Filmes"
            closeSidebar={closeSidebar}
          />
          <SidebarItem
            href="/navegar/tv"
            label="Programas de TV"
            closeSidebar={closeSidebar}
          />
          <SidebarItem
            href="/navegar/personalidades"
            label="Personalidades"
            closeSidebar={closeSidebar}
          />
        </div>
      </div>
      <div className="mt-auto">
        <h1 className="text-sm flex items-center gap-x-1.5 text-white/70 font-medium">
          Developed by
          <Link href="https://github.com/KayqueGoldner" className="hover:underline" target="_blank">
            Kayque Goldner
          </Link>
        </h1>
        <Link 
          href="https://www.themoviedb.org/" 
          target="_blank"
          className="py-4 block"
          title="https://www.themoviedb.org/"
        >
          <Image
            src="/tmdb-logo.png"
            width={160}
            height={40}
            alt="tmdb logo"
          />
        </Link>
      </div>
    </div>
  );
}
 
export default Sidebar;