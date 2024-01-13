import { Star } from "lucide-react";

import { ImovieCollection } from "@/types";
import ScrollbarSlide from "@/components/slide/scrollbar-slide";
import { GridLayout } from "@/components/grids/grid-layout";
import Card from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";

const DetailsLayout = ({
  data
}: {
  data: ImovieCollection;
}) => {
  return (
    <div>
      <GridLayout>
        <div className="relative w-full mb-5 md:m-0 md:h-full">
          <div className="block w-full xs:w-80 md:w-full md:sticky top-3 left-0 rounded-[10px] bg-outline overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              width={500}
              height={640}
              alt={data.name}
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full h-max px-1 md:px-3 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-semibold">{data.name}</h1>
          <p className="font-medium text-lg mt-4">
            {data.overview}
          </p>
          <ScrollbarSlide>
            {data.parts.map(item => (
              <Card
                key={item.id}
                title={item.title!}
                url={`/filme/${item.id}`}
                className="w-[200px]"
              >
                <Card.Image image={item.poster_path!} />
                <Card.Info>
                  <h1 className="truncate text-xl font-semibold">{item.title}</h1>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-x-2">
                      <Star size={18} fill="#fff" />
                      <p className="font-medium">
                        {item.vote_average ? item.vote_average.toFixed(1) : "0"}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                        <span className="font-medium text-sm">{item.release_date?.slice(0, 4) || "?"}</span>
                      </Badge>
                    </div>
                  </div>
                </Card.Info>
              </Card>
            ))}
          </ScrollbarSlide>
        </div>
      </GridLayout>
    </div>
  );
}
 
export default DetailsLayout;