import { fetcher } from "@/lib/fetcher";
import DetailsLayout from "./_components/details-layout";
import { ResourceNotFound } from "@/components/resource-not-found";

const getData = async (tvId: string, season: string, episode: string) => {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${season}/episode/${episode}?append_to_response=videos%2Ccredits&language=pt-BR`;
  const content = await fetcher(url);
  return content;
}

export async function generateMetadata({ 
  params,
}: { 
  params: { 
    tvId: string;
    seasonId: string;
    episodeId: string;
  };
}) {
  const data = await getData(params.tvId, params.seasonId, params.episodeId);

  if(data.status_code && data.status_code === 34) return {
    title: "Não encontrado"
  };

  return {
    title: data.name,
  }
}

const page = async ({ 
  params,
}: { 
  params: { 
    tvId: string;
    seasonId: string;
    episodeId: string;
  };
}) => {
  const content = await getData(params.tvId, params.seasonId, params.episodeId);

  if(content.status_code && content.status_code === 34) return <ResourceNotFound />;

  return (
    <div className="p-3 w-full h-full overflow-y-auto bg-surface">
      <DetailsLayout data={content} />
    </div>
  )
}

export default page