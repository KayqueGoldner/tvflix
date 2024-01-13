import { fetcher } from "@/lib/fetcher";
import { ResourceNotFound } from "@/components/resource-not-found";

import DetailsLayout from "./_components/details";

const getData = async (movieId: string) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=casts,videos,images,releases,recommendations,keywords&language=pt-BR`;
  const content = await fetcher(url);
  return content;
}

export async function generateMetadata({ params }: { params: { movieId: string } }) {
  const data = await getData(params.movieId);

  if(data.status_code && data.status_code === 34) return {
    title: "Não encontrado"
  };

  return {
    title: data.title,
  }
}

const MoviePage = async ({ params }: { params: { movieId: string; } }) => {
  const data = await getData(params.movieId);

  if(data.status_code && data.status_code === 34) return <ResourceNotFound />;

  return (
    <div 
      className="w-full h-full overflow-y-auto"
    >
      <div className="relative w-full h-full">
        <div
          className="absolute h-full w-full"
          style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`}}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/80" />
        </div>
        <div className="p-3 relative z-10">
          <DetailsLayout
            data={data}
            movieId={params.movieId}
          />
        </div>
      </div>
    </div>
  );
}
 
export default MoviePage;