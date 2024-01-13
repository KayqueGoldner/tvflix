"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import qs from "query-string";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  maxPages: number;
}

const Pagination = ({ maxPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowLocation, setWindowLocation] = useState("");
  const [routeChanging, setRouteChanging] = useState(false);
  const [pageValue, setPageValue] = useState(Number(searchParams.get("page")) || 1);

  const handleRoute = (page?: number) => {
    setRouteChanging(true)

    if(page && page > maxPages) page = maxPages;
    const url = qs.stringifyUrl({
      url: windowLocation,
      query: { page: page ? page : (Number(searchParams.get("page")) + 1) }
    });

    router.push(url);
  };

  if(maxPages > 500) maxPages = 500;

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;
    setPageValue(currentPage > maxPages ? maxPages : currentPage);
    setRouteChanging(false);
    setWindowLocation(location.href);
  }, [searchParams]);

  return (
    <div 
      className="relative flex items-center justify-center gap-x-1 sm:gap-x-2 pt-7"
    >
      <Button
        variant="outline"
        className={cn(
          "hover:bg-darkRed border-0 rounded-[100%] w-9 h-9 p-0 shrink-0",
          pageValue === 1 && "opacity-50 pointer-events-none",
          routeChanging && "opacity-50 pointer-events-none",
        )}
        onClick={() => handleRoute(pageValue - 1)}
      >
        <ArrowLeft size={20} />
      </Button>
      {pageValue >= 4 && (
        <>
          <Button
            variant="outline"
            className={cn(
              "hover:bg-darkRed border-0 rounded-[7px] px-4 font-medium text-base w-9 h-9",
              routeChanging && "opacity-50 pointer-events-none"
            )}
            onClick={() => handleRoute(1)}
          >
            1
          </Button>
          <Button
            className={cn(
              "rounded-[7px] w-9 h-9 p-0 shrink-0",
              routeChanging && "opacity-50 pointer-events-none"
            )}
            onClick={() => handleRoute(pageValue - 4)}
            title="recuar 4 páginas"
          >
            <ChevronsLeft />
          </Button>
        </>
      )}
      {pageValue > 1 && (
        <Button
          variant="outline"
          className={cn(
            "hidden sm:flex items-center justify-center hover:bg-darkRed border-0 rounded-[7px] font-medium text-[15px] w-9 h-9",
            routeChanging && "opacity-50 pointer-events-none"
          )}
          onClick={() => handleRoute(pageValue - 1)}
        >
          {pageValue - 1}
        </Button>
      )}
      <Button
        disabled
        variant="default"
        className="rounded-full text-[15px] w-9 h-9 font-medium"
        onClick={() => handleRoute(pageValue)}
      >
        {pageValue}
      </Button>
      {pageValue < maxPages && pageValue < maxPages - 1 && (
        <Button
          variant="outline"
          className={cn(
            "hidden sm:flex items-center justify-center hover:bg-darkRed border-0 rounded-[7px] px-3 py-0 font-medium text-[15px] w-9 h-9",
            routeChanging && "opacity-50 pointer-events-none"
          )}
          onClick={() => handleRoute(pageValue + 1)}
        >
          {pageValue + 1}
        </Button>
      )}
      {pageValue <= (maxPages - 4) && (
        <Button
          className={cn(
            "rounded-[7px] w-9 h-9 p-0 shrink-0",
            routeChanging && "opacity-50 pointer-events-none"
          )}
          onClick={() => handleRoute(pageValue + 4)}
          title="avançar 4 páginas"
        >
          <ChevronsRight />
        </Button>
      )}
      {pageValue < maxPages && (
        <Button
          variant="outline"
          className={cn(
            "hover:bg-darkRed border-0 rounded-[7px] font-medium text-[15px] w-9 h-9",
            routeChanging && "opacity-50 pointer-events-none"
          )}
          onClick={() => handleRoute(maxPages)}
        >
          {maxPages}
        </Button>
      )}
      <Button
        className={cn(
          "hover:bg-darkRed border-0 rounded-[100%] w-9 h-9 p-0 shrink-0",
          pageValue >= maxPages && "opacity-50 pointer-events-none",
          routeChanging && "opacity-50 pointer-events-none",
        )}
        onClick={() => handleRoute(pageValue + 1)}
        variant="outline"
      >
        <ArrowRight size={20} />
      </Button>
    </div>
  );
}
 
export default Pagination;