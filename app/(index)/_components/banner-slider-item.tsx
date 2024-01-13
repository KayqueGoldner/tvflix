"use client";

import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { GenresList } from "@/components/get-genres-list";
import { Igenres, ItvWithMovie } from "@/types";
import ElementWithPoint from "@/components/element-with-point";
import { cn } from "@/lib/utils";

export const BannerSlideItem = ({ 
  content,
  inView,
  genres,
}: { 
  content: ItvWithMovie;
  inView: boolean;
  genres: Igenres[];
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const title = content.title || content.name;
  const releaseDate = content.release_date ? content.release_date.slice(0, 4) || "?" : content.first_air_date?.slice(0, 4) || "?"
  const contentType = content.title ? "filme" : "tv";

  useEffect(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);
  
  return (
    <div className="h-[480px] w-full shadow-inner rounded-[15px] overflow-hidden">
      {hasLoaded ? (
        <div 
          className="relative w-full h-full"
        >
          {content.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w1280/${content.backdrop_path}`}
              width={1280}
              height={768}
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              alt={title || ""}
              loading="lazy"
            />
          ): (
            <div className="absolute inset-0 h-full w-full bg-outline" />
          )}
          <div className="relative h-full max-w-[600px] space-y-4 lg:max-w-full pt-14 md:pt-10 pl-5 sm:pl-9 pr-6 z-10">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:leading-tight font-bold line-clamp-2">
                {title}
              </h1>
              <div className={cn(
                "flex items-center",
                !content.genre_ids![0] && "mb-0"
              )}>
                <ElementWithPoint>
                  <h3 className="font-medium text-zinc-300 text-lg">
                    {releaseDate}
                  </h3>
                </ElementWithPoint>
                <div className="bg-red-700 px-3 rounded-[5px]">
                  <p className="leading-6 font-medium">
                    {content.vote_average ? content.vote_average.toFixed(1) : content.popularity}
                  </p>
                </div>
              </div>
            </div>
            {content.genre_ids![0] && (
              <GenresList
                genres={genres}
                contentType={contentType === "filme" ? "filmes" : "tv"}
              />
            )}
            {content.overview && (
              <p className="max-w-[600px] text-zinc-300 line-clamp-5 leading-6 font-medium">{content.overview}</p>
            )}
            <Button 
              variant="destructive" 
              className={cn(
                "rounded-[7px] px-7 py-5",
                !content.overview && "mt-3"
              )}
              asChild
            >
              <Link href={`/${contentType}/${content.id}`} className="flex items-center gap-x-2">
                <PlayCircle />
                <span className="text-base">Detalhes</span>
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-outline animate-pulse" />
      )}
    </div>
  );
}
