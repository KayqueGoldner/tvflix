import qs from "query-string";

import { Igenres, Isearch } from "@/types";
import { SearchCard } from "./_components/search-card";
import GridContainer from "@/components/grids/grid-container";
import { EmptyList } from "@/components/empty-list";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";

export async function generateMetadata({ params }: { params: { searchQuery: string } }) {
  return {
    title: decodeURIComponent(params.searchQuery).replace(/\+/g, " "),
  }
}

const PesquisarPage = async ({ 
  params,
  searchParams,
}: { 
  params: { searchQuery: string } ,
  searchParams: { [key: string]: string };
}) => {
  const searchQuery = decodeURIComponent(params.searchQuery).replace(/\+/g, " ");
  const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR';
  const updatedUrl = `https://api.themoviedb.org/3/search/${searchParams.media_type || "movie"}?query=${searchQuery}&include_adult=false&language=pt-BR`;
  
  const url = qs.stringifyUrl({
    url: updatedUrl,
    query: { page: searchParams.page }
  });

  const { results, total_pages }: { 
    results: Isearch[], 
    total_pages: number;
    total_results: number;
  } = await fetcher(url);;

  const { genres }: { genres: Igenres[] } = await fetcher(genreUrl);

  return (
    <GridContainer
      genresList={genres}
      maxPages={total_pages}
      title={searchQuery}
      className={cn(
        results.length <= 0 && "block h-auto",
      )}
    >
      {results.length ? (
        results.map(item => (
          <SearchCard key={item.id} data={item} />
        ))
      ) : (
        <EmptyList className="h-auto" />
      )}
    </GridContainer>
  );
}
 
export default PesquisarPage;