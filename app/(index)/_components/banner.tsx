import { Igenres, ItvWithMovie } from "@/types";
import { fetcher } from "@/lib/fetcher";

import { BannerSlide } from "./banner-slider";

export const Banner = async ({
  url,
  contentType
}: {
  url: string;
  contentType: "tv" | "movie";
}) => {
  const genresUrl = `https://api.themoviedb.org/3/genre/${contentType}/list?language=pt-BR`;

  const { results }: { results: ItvWithMovie[] } = await fetcher(url);
  const { genres }: { genres: Igenres[] } = await fetcher(genresUrl);

  return (
    <>
      <BannerSlide 
        data={results}
        genres={genres}
      />
    </>
  )
}

Banner.Skeleton = function BannerSkeleton(){
  return (
    <div className="h-[480px] w-full bg-outline animate-pulse" />
  )
}
