import { Star } from "lucide-react";

import GridAvatars from "@/components/grids/grid-avatars";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItvEpisode } from "@/types";
import Card from "@/components/cards/card";

export const TabNavigation = ({
  data,
}: {
  data: ItvEpisode;
}) => {
  const castList = data.credits?.cast.filter(item => item.known_for_department === "Acting");
  const directionList = data.crew?.filter(item => item.department === "Directing");
  const guestStarsList = data.guest_stars;
  
  const defaultValue =
    castList.length > 0 && "cast" ||
    directionList.length > 0 && "direction" ||
    guestStarsList.length > 0 && "guestStars" || "";

  return (
    <>
      {defaultValue && (
        <Tabs
          defaultValue={defaultValue}
          className="mt-5"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-md h-12 p-1 bg-outline/50 rounded-full">
            <TabsTrigger 
              value="cast"
              className="h-full text-base sm:text-lg rounded-full hover:bg-zinc-500/10 disabled:bg-white/5"
              disabled={castList.length <= 0}
            >
              Elenco
            </TabsTrigger>
            <TabsTrigger 
              value="guestStars"
              className="h-full text-base sm:text-lg rounded-full hover:bg-zinc-500/10 disabled:bg-white/5"
              disabled={guestStarsList.length <= 0}
            >
              Convidados
            </TabsTrigger>
            <TabsTrigger 
              value="direction"
              className="h-full text-base sm:text-lg rounded-full hover:bg-zinc-500/10 disabled:bg-white/5"
              disabled={directionList.length <= 0}
            >
              Direção
            </TabsTrigger>
          </TabsList>
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
                    <Card.Image image={item.profile_path} />
                    <Card.Info>
                      <h1 className="text-lg font-semibold leading-6 truncate mb-0.5">{item.name}</h1>
                      <span className="text-base leading-5 line-clamp-4">{item.character}</span>
                    </Card.Info>
                  </Card>
                ))}
              </GridAvatars>
            </div>
          </TabsContent>
          <TabsContent value="guestStars">
            <div className="flex flex-col gap-y-8 justify-start">
              <GridAvatars
                className="bg-outline/50 rounded-xl"
              >
                {guestStarsList?.map(item => (
                  <Card
                    key={item.id}
                    url={`/personalidade/${item.id}`}
                    title={item.name}
                  >
                    <Card.Image image={item.profile_path} />
                    <Card.Info>
                      <h1 className="text-lg font-semibold leading-6 truncate mb-0.5">{item.name}</h1>
                      <span className="text-base leading-5 line-clamp-4">{item.character}</span>
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
                  <Card.Image image={item.profile_path} />
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
      )}
    </>
  )
}