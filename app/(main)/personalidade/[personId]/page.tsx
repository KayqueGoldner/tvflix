import { DetailsLayout } from "./_components/details-layout";
import { fetcher } from "@/lib/fetcher";
import { ResourceNotFound } from "@/components/resource-not-found";

const getData = async (personId: string) => {
  const url = `https://api.themoviedb.org/3/person/${personId}?append_to_response=images,movie_credits,tv_credits&language=pt-BR`;
  const content = await fetcher(url);

  return content;
}

export async function generateMetadata({ params }: { params: { personId: string } }) {
  const data = await getData(params.personId);

  if(data.status_code && data.status_code === 34) return {
    title: "Não encontrado"
  };

  return {
    title: data.name,
  }
}

const PersonPage = async ({ params }: { params: { personId: string; } }) => {
  const data = await getData(params.personId);

  if(data.status_code && data.status_code === 34) return <ResourceNotFound />

  return (
    <div 
      className="w-full h-full overflow-y-auto"
    >
      <div
        className="bg-cover bg-center h-full w-full bg-gradient-to-t from-surface from-20% via-surface/80 to-surface/70"
      >
        <div className="p-3 h-full">
          <DetailsLayout 
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
 
export default PersonPage;