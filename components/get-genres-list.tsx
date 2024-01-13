"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Igenres } from "@/types";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";

import ElementWithPoint from "./element-with-point";

export const GenresList = ({
  genres,
  contentType,
  className
}: {
  genres: Igenres[];
  contentType: "tv" | "filmes";
  className?: string;
}) => {
  if(!genres) {
    return (
      <div className={cn(
        "flex flex-wrap mt-3 gap-y-3",
        className
      )}>
        <ElementWithPoint>
          <div className="animate-pulse h-7 w-16 bg-white/10 hover:bg-white/20 rounded-full transition" />
        </ElementWithPoint>
        <ElementWithPoint>
          <div className="animate-pulse h-7 w-16 bg-white/10 hover:bg-white/20 rounded-full transition" />
        </ElementWithPoint>
        <ElementWithPoint lastItem>
          <div className="animate-pulse h-7 w-16 bg-white/10 hover:bg-white/20 rounded-full transition" />
        </ElementWithPoint>
      </div>
    )
  }

  return (
    <div className={cn(
      "flex flex-wrap mt-3 gap-y-3",
      className
    )}>
      {genres && genres.slice(0, 3).map((item, index) => (
        <ElementWithPoint key={item.id} lastItem={index >= genres.slice(0, 3).length - 1}>
          <Link 
            href={`/navegar/${contentType}?with_genres=${item.id}`}
            className="text-white text-sm sm:text-base py-1 font-medium h-max bg-white/10 hover:bg-white/20 px-2 sm:px-3 rounded-full border border-white/20 transition"
          >
            {item.name}
          </Link>
        </ElementWithPoint>
      ))}
    </div>
  );
}
