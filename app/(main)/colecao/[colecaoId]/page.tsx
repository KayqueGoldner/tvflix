import { fetcher } from "@/lib/fetcher";
import DetailsLayout from "./_components/details";
import { ResourceNotFound } from "@/components/resource-not-found";


const getData = async (colecaoId: string) => {
  const url = `https://api.themoviedb.org/3/collection/${colecaoId}?language=pt-BR`;
  const content = await fetcher(url);
  return content;
}

export async function generateMetadata({ params }: { params: { colecaoId: string } }) {
  const data = await getData(params.colecaoId);

  if(data.status_code && data.status_code === 34) return {
    title: "Não encontrado"
  };

  return {
    title: data.name,
  }
}

const MoviePage = async ({ params }: { params: { colecaoId: string; } }) => {
  const data = await getData(params.colecaoId);

  if(data.status_code && data.status_code === 34) return <ResourceNotFound />;

  return (
    <div 
      className="w-full h-full overflow-y-auto"
    >
      <div
        className="bg-cover bg-no-repeat h-full"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`}}
      >
        <div
          className="h-full w-full pb-10 bg-gradient-to-t from-surface via-surface/90 to-surface/80"
        >
          <div className="p-3 h-full">
            <DetailsLayout
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default MoviePage;