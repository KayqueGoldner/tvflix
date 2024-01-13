import { Igenres, Itv } from "@/types";
import GridContainer from "@/components/grids/grid-container";
import { Metadata } from "next";
import Card from "@/components/cards/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import queryString from "query-string";
import { fetcher } from "@/lib/fetcher";

export const metadata: Metadata = {
  title: "Programas de TV",
}

const TvPages = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const genreUrl = 'https://api.themoviedb.org/3/genre/tv/list?language=pt-BR';
  
  if(Number(searchParams.page) > 500) searchParams.page = "500";
  const url = queryString.stringifyUrl({
    url: "https://api.themoviedb.org/3/discover/tv?language=pt-BR&include_adult=false",
    query: searchParams,
  });

  const data: {
    total_pages: number;
    results: Itv[];
    total_results: number;
  } = await fetcher(url);

  const { genres }: { genres: Igenres[] } = await fetcher(genreUrl);

  return (
    <GridContainer
      maxPages={data.total_pages}
      title="Programas de TV"
      genresList={genres}
    >
      {data.results.map(item => (
        <Card 
          key={item.id}
          title={item.name}
          url={`/tv/${item.id}`}
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
    </GridContainer>
  );
}

export default TvPages;