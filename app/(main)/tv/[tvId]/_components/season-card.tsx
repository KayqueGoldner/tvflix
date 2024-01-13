import { Film, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SeasonsList {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

const SeasonCard = ({ 
  content,
  season,
  className
}: { 
  content: SeasonsList; 
  season: number;
  className?: string;
}) => {
  const cardTitle = content.name;
  const cardDate = content.air_date.slice(0, 4) || content.air_date.slice(0, 4) || "?";

  return (
    <Link
      href={`/tv/${season}/temporada/${content.season_number}`} 
      className={cn(
        "relative w-full",
        className
      )}
    >
      <div className="w-full">
        <div className="w-full aspect-[2/3] rounded-[6px] overflow-hidden bg-outline">
          {content.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}
              alt={cardTitle}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          ): (
            <div className="w-full h-full flex items-center justify-center">
              <Film 
                size={50}
                className="text-darkRed"
                />
            </div>
          )}
        </div>
        <div>
          <h1 className="truncate text-lg xs:text-xl py-1 xs:py-2 font-semibold">{cardTitle}</h1>
          <div className="flex justify-between items-center">
            <div className="hidden xs:flex items-center gap-x-2">
              <Star size={18} fill="#fff" />
              <p className="font-medium">
                {content.vote_average ? content.vote_average.toFixed(1) : "0"}
              </p>
            </div>
            <div className="flex items-center gap-x-1">
              <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                <span className="font-medium text-sm">
                  {content.episode_count} Eps.
                </span>
              </Badge>
              <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                <span className="font-medium text-sm">{cardDate}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
 
export default SeasonCard;