import { fetcher } from "@/lib/fetcher";
import { ResourceNotFound } from "@/components/resource-not-found";

import DetailsLayout from "./_components/details-layout";

const getData = async (tvId: string) => {
  const url = `https://api.themoviedb.org/3/tv/${tvId}?append_to_response=casts,videos,images,releases,recommendations&language=pt-BR`;
  const content = await fetcher(url);
  return content;
}

export async function generateMetadata({ params }: { params: { tvId: string } }) {
  const data = await getData(params.tvId);

  if(data.status_code && data.status_code === 34) return {
    title: "Não encontrado"
  };

  return {
    title: data.name,
  }
}

const TvDetailPage = async ({ params }: { params: { tvId: string; } }) => {
  const data = await getData(params.tvId);

  if(data.status_code && data.status_code === 34) return <ResourceNotFound />

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
          />
        </div>
      </div>
    </div>
  );
}
 
export default TvDetailPage;