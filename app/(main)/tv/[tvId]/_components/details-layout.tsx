import { Film, LinkIcon, Star } from "lucide-react";
import Link from "next/link";

import { GenresList } from "@/components/get-genres-list";
import { ItvExpanded } from "@/types";
import DetailsSlider from "@/components/slide/slider-modal";
import { Badge } from "@/components/ui/badge";
import ElementWithPoint from "@/components/element-with-point";
import ScrollbarSlide from "@/components/slide/scrollbar-slide";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WatchProviders from "@/components/watch-providers";
import { GridLayout } from "@/components/grids/grid-layout";
import Card from "@/components/cards/card";

import { TabNavigation } from "./tab-navigation";

const DetailsLayout = ({
  data,
}: {
  data: ItvExpanded;
}) => {
  return (
    <>
      <GridLayout>
        <div className="relative w-full mb-5 md:m-0 md:h-full">
          <div className="block w-full xs:w-80 md:w-full md:sticky top-3 left-0 rounded-[10px] bg-outline overflow-hidden">
            {data.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                width={500}
                height={640}
                alt={data.name}
                className="w-full"
              />
            ) : (
              <div className="h-[420px] flex items-center justify-center text-darkRed">
                <Film size={50} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-max md:px-3 overflow-hidden">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-semibold">{data.name}</h1>
            {data.original_name !== data.name && (
              <h2 className="text-sm md:text-base font-semibold">
                <span className="capitalize text-neutral-300">título original: </span>
                <span className="text-neutral-100">{data.original_name}</span>
              </h2>
            )}
          </div>
          {data.homepage && (
            <Button
              className="px-0 py-3 h-max"
              variant="link"
              asChild
            >
              <Link 
                href={data.homepage}
                className="flex gap-x-2 truncate"
                target="_blank"
              >
                <LinkIcon size={18} />
                <span>{data.homepage}</span>
              </Link>
            </Button>
          )}
          <div className={cn(
            "flex flex-wrap gap-y-2 items-center",
            !data.homepage && "my-5"
          )}>
            <ElementWithPoint className="flex gap-x-2">
              <div className="flex items-center gap-x-2">
                <Star fill="#fff" size={20} />
                <p className="text-lg font-medium">
                  {data.vote_average.toFixed(1)}
                </p>
              </div>
              <Badge variant="default">
                <p className="font-medium text-base text-white">{data.vote_count}</p>
              </Badge>
            </ElementWithPoint>
            <ElementWithPoint>
              <p className="text-lg font-medium">
                {data.first_air_date?.slice(0, 4) || "?"}
              </p>
            </ElementWithPoint>
            <ElementWithPoint lastItem>
              <Badge 
                variant={data.in_production ? "default" : "destructive"}
              >
                <p className="font-medium text-base text-white">
                  {data.in_production ? "Em produção" : "Finalizado"}
                </p>
              </Badge>
            </ElementWithPoint>
          </div>
          <GenresList 
            genres={data.genres}
            contentType="tv"
            className="my-4"
          />
          <p className="font-medium text-lg">
            {data.overview}
          </p>
          {data.videos.results.length > 0 ? (
            <DetailsSlider
              content={data.videos.results} 
              title="Trailers e clipes"
              type="videos"
            />
          ): (
            <div className="space-y-2 mt-5">
              <WatchProviders 
                url={`https://api.themoviedb.org/3/tv/${data.id}/watch/providers`}
                className="py-0 pb-2 bg-transparent px-0"
              />
            </div>
          )}
        </div>
      </GridLayout>
      <div className="py-2">
        <TabNavigation data={data} tvId={data.id} />
        {data.recommendations.results.length > 0 && (
          <ScrollbarSlide 
            title="Você Também Pode Gostar"
            className="pt-6 pb-3"
          >
            {data.recommendations.results.map(item => (
              <Card
                key={item.id}
                title={item.name}
                url={`/tv/${item.id}`}
                className="w-[200px]"
              >
                <Card.Image image={item.poster_path} />
                <Card.Info>
                  <h1 className="truncate text-xl font-semibold">{item.name}</h1>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-x-2">
                      <Star size={18} fill="#fff" />
                      <p className="font-medium">
                        {item.vote_average ? item.vote_average.toFixed(1) : "0"}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                        <span className="font-medium text-sm">{item.first_air_date?.slice(0, 4) || "?"}</span>
                      </Badge>
                    </div>
                  </div>
                </Card.Info>
              </Card>
            ))}
          </ScrollbarSlide>
        )}
      </div>
    </>
  );
}
 
export default DetailsLayout;