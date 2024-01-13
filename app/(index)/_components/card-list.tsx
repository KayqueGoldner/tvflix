import { Star } from "lucide-react";

import { ItvWithMovie } from "@/types";
import { fetcher } from "@/lib/fetcher";
import ScrollbarSlide from "@/components/slide/scrollbar-slide";
import { cn } from "@/lib/utils";
import Card from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";

interface MoviesListProps {
  url: string;
  title: string;
  className?: string;
}

const CardList = async ({
  url,
  title,
  className
}: MoviesListProps) => {
  const { results }: { results: ItvWithMovie[]; } = await fetcher(url);

  if(results.length < 1) return null;

  return (
    <div className={cn("mb-7", className)}>
      <ScrollbarSlide
        title={title}
      >
        {results.map(item => {
          const title = item.title || item.name;
          const releaseData = item.release_date || item.first_air_date;
          const url = item.title ? `/filme/${item.id}` : `/tv/${item.id}`;

          return (
            <Card
              key={item.id}
              title={item.title!}
              url={url}
              className="w-[200px]"
            >
              <Card.Image image={item.poster_path!} />
              <Card.Info>
                <h1 className="truncate text-xl font-semibold">{title}</h1>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-x-2">
                    <Star size={18} fill="#fff" />
                    <p className="font-medium">
                      {item.vote_average ? item.vote_average.toFixed(1) : "0"}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                      <span className="font-medium text-sm">
                        {releaseData?.slice(0, 4) || "?"}
                      </span>
                    </Badge>
                  </div>
                </div>
              </Card.Info>
            </Card>
          )
        })}
      </ScrollbarSlide>
    </div>
  )
}
 
export default CardList;