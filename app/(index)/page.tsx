import { Suspense } from "react";
import CardList from "./_components/card-list";
import { Banner } from "./_components/banner";

export default async function Home() {
  const moviesListUrls = [
    {
      name: "Filmes Mais Bem Avaliados",
      url: 'https://api.themoviedb.org/3/movie/top_rated?&page=1&region=BR&language=pt-BR',
    },
    {
      name: "Filmes Populares",
      url: 'https://api.themoviedb.org/3/movie/popular?&page=1&region=BR&language=pt-BR',
    },
    {
      name: "Próximos Filmes",
      url: 'https://api.themoviedb.org/3/movie/upcoming?&page=1&region=BR&language=pt-BR',
    },
  ];
  const tvListUrls = [
    {
      name: "Programas De TV Mais Bem Avaliados",
      url: 'https://api.themoviedb.org/3/tv/top_rated?&page=1&region=BR&language=pt-BR',
    },
    {
      name: "Programas De TV Populares",
      url: 'https://api.themoviedb.org/3/tv/popular?&page=1&region=BR&language=pt-BR',
    },
    {
      name: "Próximos Programas De TV",
      url: 'https://api.themoviedb.org/3/tv/on_the_air?&page=1&region=BR&language=pt-BR',
    },
  ];

  return (
    <div className="py-3 px-4 pb-5 space-y-5 overflow-y-auto bg-surface">
      <Suspense fallback={<Banner.Skeleton />}>
        <Banner
          url="https://api.themoviedb.org/3/movie/now_playing?&language=pt-BR"
          contentType="movie"
        />
      </Suspense>
      {moviesListUrls.map(item => (
        <CardList
          key={item.name}
          url={item.url} 
          title={item.name}
        />
      ))}
      <Suspense fallback={<Banner.Skeleton />}>
        <Banner
          url="https://api.themoviedb.org/3/tv/airing_today?&language=pt-BR"
          contentType="tv"
        />
      </Suspense>
      {tvListUrls.map(item => (
        <CardList 
          key={item.name}
          url={item.url} 
          title={item.name}
        />
      ))}
    </div>
  )
}
