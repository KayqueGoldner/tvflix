import { Metadata } from "next";
import qs from "query-string";
import { Star, User } from "lucide-react";

import GridContainer from "@/components/grids/grid-container";
import { Igenres, Ipeople } from "@/types";
import Card from "@/components/cards/card";
import { fetcher } from "@/lib/fetcher";

export const metadata: Metadata = {
  title: "Personalidades",
}

const PeoplePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR';

  if(searchParams.page > "500") searchParams.page = "500"
  const url = qs.stringifyUrl({
    url: "https://api.themoviedb.org/3/person/popular?language=pt-BR",
    query: searchParams
  });

  const data: Ipeople = await fetcher(url);

  const { genres }: { genres: Igenres[] } = await fetcher(genreUrl);

  return (
    <GridContainer
      maxPages={data.total_pages}
      title="Personalidades"
      genresList={genres}
    >
      {data.results.map(item => (
        <Card
          key={item.id}
          url={`/personalidade/${item.id}`}
          title={item.name}
        >
          <Card.Image 
            image={item.profile_path}
            icon={<User size={50} className="text-darkRed" />}
          />
          <Card.Info>
          <h1 className="truncate text-xl font-semibold">{item.name}</h1>
          <div className="flex items-center gap-x-1">
            <div className="flex items-center gap-x-2 py-1">
              <Star size={18} fill="#fff" />
              <p className="font-medium">{item.popularity.toFixed(1)}</p>
            </div>
          </div>
          </Card.Info>
        </Card>
      ))}
    </GridContainer>
  );
}

export default PeoplePage;