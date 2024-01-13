import { Star, User } from "lucide-react";

import GridAvatars from "@/components/grids/grid-avatars";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItvSeason } from "@/types";
import Card from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";

export const TabNavigation = ({
  data,
}: {
  data: ItvSeason;
}) => {
  const castList = data.credits?.cast.filter(item => item.known_for_department === "Acting");
  const productionList = data.credits?.crew.filter(item => item.department === "Production");
  
  const defaultValue = 
    data.episodes.length > 0 && "episodes" ||
    castList.length > 0 && "cast" ||
    productionList.length > 0 && "production" || "";

  return (
    <Tabs 
      defaultValue={defaultValue}
      className="mt-5"
    >
      <TabsList className="grid grid-cols-3 w-full max-w-md h-12 p-1 bg-outline/50 rounded-full">
        <TabsTrigger 
          value="episodes"
          className="h-full text-base sm:text-lg rounded-full hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={data.episodes.length <= 0}
        >
          Episódios
        </TabsTrigger>
        <TabsTrigger 
          value="cast"
          className="h-full text-base sm:text-lg rounded-full hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={castList.length <= 0}
        >
          Elenco
        </TabsTrigger>
        <TabsTrigger 
          value="production"
          className="h-full text-base sm:text-lg rounded-full hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={productionList.length <= 0}
        >
          Produção
        </TabsTrigger>
      </TabsList>
      <TabsContent value="episodes">
        <div className="bg-outline/50 rounded-xl">
          <GridAvatars
            className="bg-outline/50 rounded-xl"
          >
            {data.episodes?.map(item => {
              if(item.season_number !== 0) {
                return (
                  <Card 
                    key={item.id}
                    title={item.name}
                    url={`/tv/${item.show_id}/temporada/${item.season_number}/episodio/${item.episode_number}`}
                  >
                    <Card.Image 
                      image={item.still_path}
                      className="w-full aspect-video rounded-[6px] overflow-hidden bg-outline"
                    />
                    <Card.Info className="py-0 pb-1">
                      <h1 className="truncate py-1 text-lg font-semibold">{item.name}</h1>
                      <div className="flex justify-between items-center">
                        <div className="hidden xs:flex items-center gap-x-2">
                          <Star size={18} fill="#fff" />
                          <p className="font-medium">
                            {item.vote_average ? item.vote_average.toFixed(1) : "0"}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm truncate">
                              Ep. {item.episode_number}
                            </span>
                          </Badge>
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">{item.runtime ? `${item.runtime}m` : "?"}</span>
                          </Badge>
                        </div>
                      </div>
                    </Card.Info>
                  </Card>
                )
              }
            })}
          </GridAvatars>
        </div>
      </TabsContent>
      <TabsContent value="cast">
        <div className="flex flex-col gap-y-8 justify-start">
          <GridAvatars
            className="bg-outline/50 rounded-xl"
          >
            {castList?.map(item => (
              <Card
                key={item.id}
                url={`/personalidade/${item.id}`}
                title={item.name}
              >
                <Card.Image 
                  image={item.profile_path}
                  icon={<User size={50} className="text-darkRed" />}
                />
                <Card.Info>
                  <h1 className="text-lg font-semibold leading-6 truncate mb-0.5">{item.name}</h1>
                  <span className="text-base leading-5 line-clamp-4">{item.character}</span>
                </Card.Info>
              </Card>
            ))}
          </GridAvatars>
        </div>
      </TabsContent>
      <TabsContent value="production">
        <GridAvatars
          className="bg-outline/50 rounded-xl"
        >
          {productionList?.map(item => (
            <Card 
              key={item.id}
              url={`/personalidade/${item.id}`}
              title={item.name}
            >
              <Card.Image 
                image={item.profile_path}
                icon={<User size={50} className="text-darkRed" />}
              />
              <Card.Info>
                <h1 className="text-lg font-semibold leading-7 truncate">{item.name}</h1>
                <div className="flex items-center gap-x-2">
                  <Star fill="#fff" size={18} />
                  <p className="font-medium">{item.popularity.toFixed(1)}</p> 
                </div>
              </Card.Info>
            </Card>
          ))}
        </GridAvatars>
      </TabsContent>
    </Tabs>
  )
}