"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Igenres } from "@/types";
import { Button } from "@/components/ui/button";
import FilterNav from "@/components/filter/filter-nav";
import Pagination from "@/components/pagination";
import { cn } from "@/lib/utils";


interface GridContainerProps {
  children: React.ReactNode;
  maxPages: number;
  title?: string;
  genresList?: Igenres[];
  className?: string;
}

const GridContainer = ({ 
  children,
  maxPages,
  title,
  genresList,
  className
}: GridContainerProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(containerRef.current) {
      containerRef.current.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [searchParams]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto py-7 px-3 xs:px-4"
    >
      <h1 className="text-4xl sm:text-6xl font-bold capitalize break-words">{title}</h1>
      <div className="mt-6 mb-10">
        {!pathname.includes("personalidades") && (
          <FilterNav
            genresList={genresList!}
          />
        )}
      </div>
      {children ? (
        <div 
          className={cn(
            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-5 w-full",
            className
          )}
        >
          {children}
        </div>
      ): (
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h1 className="text-2xl">Nenhum resultado.</h1>
          <Button className="bg-darkRed hover:bg-darkRed/80 text-white px-4 rounded-[5px]">
            <Link href="/" className="text-base">Voltar para página inicial</Link>
          </Button>
        </div>
      )}
      {maxPages > 1 && (
        <Pagination
          maxPages={maxPages}
        />
      )}
    </div>
  );
}
 
export default GridContainer;