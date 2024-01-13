import { Film, Star } from "lucide-react";

import { ItvEpisode } from "@/types";
import DetailsSlider from "@/components/slide/slider-modal";
import { Badge } from "@/components/ui/badge";
import ElementWithPoint from "@/components/element-with-point";
import { TabNavigation } from "./tab-navigation";

const DetailsLayout = ({
  data,
}: {
  data: ItvEpisode;
}) => {
  return (
    <>
      <div 
        className="block md:grid md:grid-cols-gridLayout-md lg:grid-cols-gridLayout-lg gap-3 py-3"
      >
        <div className="relative w-full mb-5 md:m-0 md:h-full">
          {data.still_path ? (
            <div className="block w-full xs:w-80 md:w-full md:sticky top-3 left-0">
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.still_path}`}
                width={500}
                height={640}
                alt={data.name}
                className="w-full"
              />
            </div>
          ): (
            <div className="w-full h-96 bg-outline flex items-center justify-center">
              <Film 
                size={50}
                className="text-darkRed"
              />
            </div>
          )}
        </div>
        <div className="w-full h-max md:px-3 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-semibold">{data.name}</h1>
          <div className="flex flex-wrap gap-y-2 items-center my-4">
            <ElementWithPoint className="flex gap-x-2">
              <div className="flex items-center gap-x-2">
                <Star fill="#fff" size={20} />
                <p className="text-lg font-medium">
                  {data.vote_average?.toFixed(1)}
                </p>
              </div>
              <Badge variant="default">
                <p className="font-medium text-base text-white">{data.vote_average}</p>
              </Badge>
            </ElementWithPoint>
            <ElementWithPoint>
              <p className="text-lg font-medium">
                {data.runtime ? `${data.runtime}m` : "0m"}
              </p>
            </ElementWithPoint>
            <ElementWithPoint lastItem>
              <p className="text-lg font-medium">
                {data.air_date?.slice(0, 4) || "?"}
              </p>
            </ElementWithPoint>
          </div>
          {data.overview && (
            <p className="font-medium text-lg">
              {data.overview}
            </p>
          )}
          {data.videos?.results.length > 0 && (
            <DetailsSlider
              content={data.videos.results} 
              title="Trailers e clipes"
              type="videos"
            />
          )}
        </div>
      </div>
      <div className="py-2">
        <TabNavigation data={data} />
      </div>
    </>
  );
}
 
export default DetailsLayout;