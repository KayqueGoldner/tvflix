import { ResourceNotFound } from "@/components/resource-not-found";
import DetailsLayout from "./_components/details-layout";
import { fetcher } from "@/lib/fetcher";

const getData = async (tvId: string, season: string) => {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${season}?append_to_response=aggregate_credits,credits,images,videos&language=pt-BR`;
  const content = await fetcher(url);
  return content;
}

export async function generateMetadata({ 
  params,
}: { 
  params: { 
    tvId: string;
    seasonId: string;
  };
}) {
  const data = await getData(params.tvId, params.seasonId);

  if(data.status_code && data.status_code === 34) return {
    title: "Não encontrado"
  };

  return {
    title: data.name,
  }
}

const TemporadaPage = async ({ 
  params,
}: { 
  params: { 
    tvId: string;
    seasonId: string;
  };
}) => {
  const content = await getData(params.tvId, params.seasonId);

  if(content.status_code && content.status_code === 34) return <ResourceNotFound />;

  return (
    <div className="p-3 w-full h-full overflow-y-auto">
      <DetailsLayout data={content} />
    </div>
  );
}
 
export default TemporadaPage;