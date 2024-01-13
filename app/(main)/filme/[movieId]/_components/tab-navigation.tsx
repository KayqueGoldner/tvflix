import { Building, User } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImovieExpanded } from "@/types";
import WatchProviders from "@/components/watch-providers";
import GridAvatars from "@/components/grids/grid-avatars";
import Card from "@/components/cards/card";

interface TabNavigationProps {
  data: ImovieExpanded;
  movieId: string;
}

export const TabNavigation = ({
  data,
  movieId
}: TabNavigationProps) => {
  const castList = data.casts?.cast.filter(item => item.known_for_department === "Acting");
  const directionList = data.casts?.crew.filter(item => item.job === "Director");
  const productionList = data.casts?.crew.filter(item => item.job === "Producer");

  return (
    <Tabs defaultValue="details">
      <TabsList
        className="grid grid-cols-4 w-full max-w-md h-12 px-1 bg-outline/50 rounded-full"
      >
        <TabsTrigger
          value="details"
          className="rounded-full px-4 hover:bg-zinc-500/10 disabled:bg-white/5"
        >
          <p className="text-base sm:text-lg">Detalhes</p>
        </TabsTrigger>
        <TabsTrigger
          value="cast"
          className="rounded-full px-4 hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={castList ? castList.length <= 0 : true}
        >
          <p className="text-base sm:text-lg">Elenco</p>
        </TabsTrigger>
        <TabsTrigger
          value="direction"
          className="rounded-full px-4 hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={directionList ? directionList.length <= 0 : true}
        >
          <p className="text-base sm:text-lg">Direção</p>
        </TabsTrigger>
        <TabsTrigger
          value="production"
          className="rounded-full px-4 hover:bg-zinc-500/10 disabled:bg-white/5"
          disabled={productionList ? productionList.length <= 0 : true}
        >
          <p className="text-base sm:text-lg">Produção</p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <div className="space-y-4 px-2 py-3 bg-outline/50 rounded-xl">
          {data.videos?.results.length > 0 && (
            <WatchProviders url={`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`} />
          )}
          {data.production_companies?.length > 0 && (
            <div className="bg-outline/70 rounded-[10px] p-3">
              <h1 className="text-xl font-semibold mb-2 capitalize">empresas de produção</h1>
              <div className="flex gap-2.5 flex-wrap">
                {data.production_companies.map(item => (
                  <Card 
                    key={item.id} 
                    className="w-14"
                    title={item.name}
                  >
                    <Card.Image 
                      image={item.logo_path}
                      className="aspect-square bg-white/5"
                      imageClassName="w-full object-contain"
                      icon={<Building size={20} className="text-darkRed" />}
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
                <Card.Info className="pt-2">
                  <h1 className="text-lg font-semibold truncate leading-6">{item.name}</h1>
                  <span className="text-base leading-5">{item.character}</span>
                </Card.Info>
              </Card>
            ))}
          </GridAvatars>
        </div>
      </TabsContent>
      <TabsContent value="direction">
        <GridAvatars
          className="bg-outline/50 rounded-xl"
        >
          {directionList?.map(item => (
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
                <h1 className="text-lg font-semibold truncate leading-6">{item.name}</h1>
              </Card.Info>
            </Card>
          ))}
        </GridAvatars>
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
                <h1 className="text-lg font-semibold truncate leading-6">{item.name}</h1>
              </Card.Info>
            </Card>
          ))}
        </GridAvatars>
      </TabsContent>
    </Tabs>
  )
}