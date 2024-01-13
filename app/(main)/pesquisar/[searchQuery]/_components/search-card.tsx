"use client";

import { Star, User } from "lucide-react";
import { useSearchParams } from "next/navigation";

import Card from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Isearch } from "@/types";
import { cn } from "@/lib/utils";
import { mediaTypeList } from "@/constants";

export const SearchCard = ({
  data
}: {
  data: Isearch;
}) => {
  const searchParams = useSearchParams();

  const {
    id,
    poster_path,
    profile_path,
    title: movieTitle,
    name,
    popularity,
    release_date,
    first_air_date,
    media_type
  } = data;

  const queryValue: typeof media_type = searchParams.get("media_type") as typeof media_type;
  const title = name || movieTitle || "";
  const poster = poster_path || profile_path || "";
  const releaseYear = release_date ? release_date.slice(0, 4) : first_air_date?.slice(0, 4) || "?";
  const showReleaseYear = 
    queryValue 
    ?
      queryValue === "movie" || 
      queryValue === "tv" || 
      queryValue === "multi" && 
      media_type !== "person"
    :
      true;


  const mediaTypeLabels = {
    movie: "Filme",
    tv: "TV",
    person: "Personalidade",
    collection: "Coleção",
    multi: "multi"
  };
  const contentType = mediaTypeLabels[media_type!] || mediaTypeLabels[queryValue!] || "Filme";
  const mediaTypeUrl = mediaTypeList.find(item => item.value === media_type || (item.value === queryValue && queryValue !== "multi"))?.query || "filme";
  const url = `/${mediaTypeUrl}/${id}`;


  return (
    <Card
      title={title}
      url={url}
    >
      <Card.Image 
        image={poster} 
        icon={contentType === "Personalidade" ? <User size={50} className="text-darkRed" /> : ""}
      />
      <Card.Info>
        <h1 className="truncate text-xl font-semibold">
          {title}
        </h1>
        <div 
          className={cn(
            "flex justify-between items-center py-2",
            queryValue === "collection" && "justify-end",
          )}
        >
          {queryValue !== "collection" && (
            <div className="hidden xs:flex items-center gap-x-2 ">
              <Star size={18} fill="#fff" />
              <p className="font-medium">
                {popularity?.toFixed(1) || "0"}
              </p>
            </div>
          )}
          <div className="flex items-center gap-x-1">
            <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
              <span className="font-medium text-sm capitalize">
                {contentType}
              </span>
            </Badge>
            {showReleaseYear && (
              <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                <span className="font-medium text-sm">
                  {releaseYear}
                </span>
              </Badge>
            )}
          </div>
        </div>
      </Card.Info>
    </Card>
  )
}