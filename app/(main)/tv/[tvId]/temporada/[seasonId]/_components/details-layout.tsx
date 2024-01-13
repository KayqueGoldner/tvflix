import { Film, Star } from "lucide-react";

import { ItvSeason } from "@/types";
import DetailsSlider from "@/components/slide/slider-modal";
import { Badge } from "@/components/ui/badge";
import ElementWithPoint from "@/components/element-with-point";
import { GridLayout } from "@/components/grids/grid-layout";

import { TabNavigation } from "./tab-navigation";

const DetailsLayout = ({
  data,
}: {
  data: ItvSeason;
}) => {
  return (
    <>
      <GridLayout className="h-max">
        <div className="relative w-full h-full mb-5 md:m-0">
          {data.poster_path ? (
            <div className="w-full xs:w-80 md:w-full md:sticky top-3 left-0 rounded-[10px] bg-outline overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                width={500}
                height={640}
                alt={data.name}
                className="w-full h-full"
              />
            </div>
          ): (
            <div className="w-full h-[420px] flex items-center justify-center bg-outline">
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
            <ElementWithPoint lastItem>
              <p className="text-lg font-medium">
                {data.air_date?.slice(0, 4) || "?"}
              </p>
            </ElementWithPoint>
          </div>
          <p className="font-medium text-lg">
            {data.overview}
          </p>
          {data.videos?.results.length > 0 && (
            <DetailsSlider
              content={data.videos.results} 
              title="Trailers e clipes"
              type="videos"
            />
          )}
        </div>
      </GridLayout>
      <div className="mt-3">
        <TabNavigation data={data} />
      </div>
    </>
  );
}
 
export default DetailsLayout;