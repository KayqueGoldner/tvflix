import Card from "@/components/cards/card";
import GridAvatars from "@/components/grids/grid-avatars";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import WatchProviders from "@/components/watch-providers";
import { ItvExpanded } from "@/types";
import { Building, Star, User } from "lucide-react";

export const TabNavigation = ({
  data,
  tvId,
}: {
  data: ItvExpanded,
  tvId: number;
}) => {
  const createdBy = data.created_by;
  const information = [
    {
      name: "slogan",
      value: data?.tagline || null,
    },
    {
      name: "última exibição",
      value: data.last_air_date ? new Date(data?.last_air_date).toLocaleDateString("pt-br", { timeZone: "utc" }) : null,
    },
    {
      name: "número de temporadas",
      value: data.number_of_seasons || null,
    },
    {
      name: "número de episódios",
      value: data.number_of_episodes || null,
    },
  ];

  return (
    <Tabs 
      defaultValue="details"
      className="mt-5"
    >
      <TabsList className="grid grid-cols-3 w-full max-w-md h-12 p-1 bg-outline/50 rounded-full">
        <TabsTrigger
          value="details"
          className="text-lg rounded-full px-4 hover:bg-zinc-500/10"
        >
          Detalhes
        </TabsTrigger>
        <TabsTrigger 
          value="seasons"
          className="text-lg rounded-full px-4 hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={data.seasons.length <= 0}
        >
          Temporadas
        </TabsTrigger>
        <TabsTrigger 
          value="creators"
          className="text-lg rounded-full px-4 hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={createdBy.length <= 0}
        >
          Criadores
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <div className="flex flex-col gap-y-4 px-2 py-3 bg-outline/50 rounded-xl">
          {information.some(item => item.value !== null) && (
            <div className="flex flex-col gap-y-1 mt-2 bg-outline/70 p-3 rounded-[10px]">
              {information.map(item => {
                if(item.value) {
                  return (
                    <div key={item.value} className="flex gap-x-2">
                      <p className="font-medium text-lg capitalize text-red-500">{item.name}:</p>
                      <p className="text-lg">{item.value}</p>
                    </div>
                  )
                }
              })}
            </div>
          )}
          {data.videos.results.length > 0 && (
            <WatchProviders url={`https://api.themoviedb.org/3/tv/${data.id}/watch/providers`} />
          )}
          {data.last_episode_to_air || data.next_episode_to_air ? (
            <div className="flex items-center gap-x-2 gap-y-3 flex-wrap">
              {data.last_episode_to_air && (
                <div className="space-y-2 pl-3">
                  <h1 className="text-xl font-semibold mb-2 capitalize">último episódio</h1>
                  <Card
                    title={data.last_episode_to_air.name}
                    url={`/tv/${data.id}/temporada/${data.last_episode_to_air.season_number}/episodio/${data.last_episode_to_air.episode_number}`}
                    className="w-[300px]"
                  >
                    <Card.Image 
                      image={data.last_episode_to_air.still_path}
                      className="aspect-video"
                    />
                    <Card.Info className="py-1">
                      <h1 className="truncate text-lg xs:text-xl py-1 font-semibold">
                        {data.last_episode_to_air.name}
                      </h1>
                      <div className="flex justify-between items-center">
                        <div className="hidden xs:flex items-center gap-x-2">
                          <Star size={18} fill="#fff" />
                          <p className="font-medium">
                            {
                              data.last_episode_to_air.vote_average ? 
                              data.last_episode_to_air.vote_average.toFixed(1) : 
                              "0"
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">
                              {data.last_episode_to_air.season_number} Temp.
                            </span>
                          </Badge>
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">{data.last_episode_to_air.air_date.slice(0, 4)}</span>
                          </Badge>
                        </div>
                      </div>
                    </Card.Info>
                  </Card>
                </div>
              )}
              {data.next_episode_to_air && (
                <div className="space-y-2 pl-3">
                  <h1 className="text-xl font-semibold mb-2 capitalize">Próximo episódio</h1>
                  <Card
                    title={data.next_episode_to_air.name}
                    url={`/tv/${data.id}/temporada/${data.next_episode_to_air.season_number}/episodio/${data.next_episode_to_air.episode_number}`}
                    className="w-[300px]"
                  >
                    <Card.Image 
                      image={data.next_episode_to_air.still_path}
                      className="aspect-video"
                    />
                    <Card.Info className="py-1">
                      <h1 className="truncate text-lg xs:text-xl py-1 font-semibold">
                        {data.next_episode_to_air.name}
                      </h1>
                      <div className="flex justify-between items-center">
                        <div className="hidden xs:flex items-center gap-x-2">
                          <Star size={18} fill="#fff" />
                          <p className="font-medium">
                            {
                              data.next_episode_to_air.vote_average ? 
                              data.next_episode_to_air.vote_average.toFixed(1) : 
                              "0"
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">
                              {data.next_episode_to_air.season_number} Temp.
                            </span>
                          </Badge>
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">{data.next_episode_to_air.air_date.slice(0, 4)}</span>
                          </Badge>
                        </div>
                      </div>
                    </Card.Info>
                  </Card>
                </div>
              )}
            </div>
          ) : null}
          {data.production_companies.length > 0 && (
            <div className="bg-outline/70 rounded-[10px] p-3">
              <h1 className="text-xl font-semibold mb-2 capitalize">empresas de produção</h1>
              <div className="flex gap-2.5 flex-wrap">
                {data.production_companies && data.production_companies.map(item => (
                  <Card 
                    key={item.id} 
                    className="w-14"
                    title={item.name}
                  >
                    <Card.Image 
                      image={item.logo_path}
                      className="aspect-square bg-white/5"
                      imageClassName="w-full object-contain"
                      icon={<Building className="text-darkRed" />}
                      hoverEffect={false}
                    />
                    <Card.Info>
                      <h3 className="text-sm leading-4 font-medium line-clamp-2 break-all">
                        {item.name}
                      </h3>
                    </Card.Info>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="seasons">
        <div className="bg-outline/50 rounded-xl">
          <GridAvatars
            className="bg-outline/50 rounded-xl"
          >
            {data.seasons.map(item => {
              if(item.season_number !== 0) {
                return (
                  <Card 
                    title={item.name} 
                    url={`/tv/${tvId}/temporada/${item.season_number}`}
                    key={item.id}
                  >
                    <Card.Image image={item.poster_path} />
                    <Card.Info className="pb-1 pt-0">
                      <h1 className="truncate py-1.5 text-lg xs:text-xl font-semibold">{item.name}</h1>
                      <div className="flex justify-between items-center">
                        <div className="hidden xs:flex items-center gap-x-2">
                          <Star size={18} fill="#fff" />
                          <p className="font-medium">
                            {item.vote_average ? item.vote_average.toFixed(1) : "0"}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">
                              {item.episode_count} Eps.
                            </span>
                          </Badge>
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">{item.air_date?.slice(0, 4) || "?"}</span>
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
      <TabsContent value="creators">
        <GridAvatars
          className="bg-outline/50 rounded-xl"
        >
          {createdBy.map(item => (
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
                <h1 className="truncate text-xl font-semibold">{item.name}</h1>
              </Card.Info>
            </Card>
          ))}
        </GridAvatars>
      </TabsContent>
    </Tabs>
  )
}