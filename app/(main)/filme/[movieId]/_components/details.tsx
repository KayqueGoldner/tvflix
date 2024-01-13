import Link from "next/link";
import { ArrowUpRight, Film, LinkIcon, Star } from "lucide-react";

import { GenresList } from "@/components/get-genres-list";
import { ImovieExpanded } from "@/types";
import WatchProviders from "@/components/watch-providers";
import SliderModal from "@/components/slide/slider-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollbarSlide from "@/components/slide/scrollbar-slide";
import { cn, formatTime } from "@/lib/utils";
import { GridLayout } from "@/components/grids/grid-layout";
import ElementWithPoint from "@/components/element-with-point";
import { LinkBtn } from "@/components/link-btn";
import Card from "@/components/cards/card";

import { TabNavigation } from "./tab-navigation";

const DetailsLayout = ({
  data,
  movieId
}: {
  data: ImovieExpanded;
  movieId?: string;
}) => {
  const links = [
    {
      name: "coleção",
      value: data.belongs_to_collection?.name,
      link: `/colecao/${data.belongs_to_collection?.id}`,
      target: "_self" as const,
    },
    {
      name: "IMDB",
      value: data?.imdb_id,
      link: `https://www.imdb.com/title/${data?.imdb_id}`,
      target: "_blank" as const,
    }
  ];
  const lastItem = !data.belongs_to_collection?.id && !data.imdb_id;

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
                alt={data.title}
                className="w-full"
              />
            ) : (
              <div className="h-[420px] flex items-center justify-center text-darkRed">
                <Film size={50} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-max px-1 md:px-3 overflow-hidden">
          <div className="space-y-1.5">
            <h1 className="text-4xl md:text-5xl font-semibold">{data.title}</h1>
            {data.original_title !== data.title && (
              <h2 className="text-sm md:text-base font-semibold">
                <span className="capitalize text-neutral-300">título original: </span>
                <span className="text-neutral-100">{data.original_title}</span>
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
                className="flex gap-x-2"
                target="_blank"
              >
                <LinkIcon size={18} />
                <span className="truncate">{data.homepage}</span>
              </Link>
            </Button>
          )}
          <div className={cn(
            "mb-2 flex items-center flex-wrap gap-y-2",
            !data.homepage && "mt-4"
          )}>
            <ElementWithPoint>
              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Star fill="#fff" size={20} />
                  <p className="text-lg font-medium">
                    {data.vote_average?.toFixed(1) || "0"}
                  </p>
                </div>
                <Badge className="bg-darkRed hover:bg-darkRed/80 rounded-[5px] h-6">
                  <p className="font-medium text-base text-white">{data.vote_count || 0}</p>
                </Badge>
              </div>
            </ElementWithPoint>
            <ElementWithPoint>
              <p className="font-medium text-lg">
                {data.runtime ? formatTime(data.runtime) : "0m"}
              </p>
            </ElementWithPoint>
            <ElementWithPoint lastItem={lastItem}>
              <p className="text-lg font-medium">
                {data.release_date?.slice(0, 4) || "?"}
              </p>
            </ElementWithPoint>
            {links.map((item, index) => {
              if(item.value) {
                return (
                  <ElementWithPoint key={index} lastItem={index >= links.length - 1}>
                    <LinkBtn 
                      href={item.link}
                      target={item.target}
                      className="px-3"
                    >
                      <span className="leading-7 font-medium text-base">
                        {item.name}
                      </span>
                      <ArrowUpRight strokeWidth={2.2} className="w-5 h-5" />
                    </LinkBtn>
                  </ElementWithPoint>
                )
              }
            })}
          </div>
          {data.genres?.length >= 1 && (
            <GenresList 
              genres={data.genres}
              contentType="filmes"
              className="my-4"
            />
          )}
          {data.overview && (
            <p className="font-medium text-lg">
              {data.overview}
            </p>
          )}
          {data.videos?.results.length > 0 ? (
            <SliderModal
              content={data.videos?.results}
              title="Trailers e Clipes"
              type="videos"
            />
          ): (
            <WatchProviders 
              url={`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`}
              className="py-0 pb-2 bg-transparent px-0 space-y-2 mt-5"
            />
          )}
        </div>
      </GridLayout>
      <div className="mt-3">
        <TabNavigation 
          data={data}
          movieId={movieId!}
        />
        {data.recommendations?.results.length > 0 && (
          <ScrollbarSlide
            title="Você Também Pode Gostar"
            className="pt-6 pb-3"
          >
            {data.recommendations?.results.map(item => (
              <Card
                key={item.id}
                title={item.title!}
                url={`/filme/${item.id}`}
                className="w-[200px]"
              >
                <Card.Image image={item.poster_path!} />
                <Card.Info>
                  <h1 className="truncate text-xl font-semibold">{item.title}</h1>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-x-2">
                      <Star size={18} fill="#fff" />
                      <p className="font-medium">
                        {item.vote_average ? item.vote_average.toFixed(1) : "0"}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                        <span className="font-medium text-sm">{item.release_date?.slice(0, 4) || "?"}</span>
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