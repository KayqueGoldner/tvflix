"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

import ScrollbarSlide from "@/components/slide/scrollbar-slide";
import Card from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DetailsListsProps {
  moviesList: {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
  }[];
  tvList: {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number
    vote_count: number;
    character: string;
    credit_id: string;
    episode_count: number;
  }[];
}

export const DetailsLists = ({
  moviesList,
  tvList
}: DetailsListsProps) => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [orderType, setOrderType] = useState<"release_date" | "popularity">("release_date");

  const filteredMovies = moviesList.filter((obj, index, self) => index === self.findIndex((el) => el["id"] === obj["id"])).sort((a, b) => {
    if(order === "desc") {
      if (a[orderType] > b[orderType]) {
        return -1;
      } else if (b[orderType] > a[orderType]) {
        return 1;
      }
    } else if(order === "asc") {
      if (a[orderType] < b[orderType]) {
        return -1;
      } else if (b[orderType] < a[orderType]) {
        return 1;
      }
    }
    return 0;
  });

  const filteredTv = tvList.filter((obj, index, self) => index === self.findIndex((el) => el["id"] === obj["id"])).sort((a, b) => {
    let tvOrderType: "first_air_date" | "popularity" = orderType === "release_date" ? "first_air_date" : orderType;
    if(order === "desc") {
      if (a[tvOrderType] > b[tvOrderType]) {
        return -1;
      } else if (b[tvOrderType] > a[tvOrderType]) {
        return 1;
      }
      return 0;
    } else if(order === "asc") {
      if (a[tvOrderType] < b[tvOrderType]) {
        return -1;
      } else if (b[tvOrderType] < a[tvOrderType]) {
        return 1;
      }
      return 0;
    }
    return 0;
  });

  const changeOrderType = () => {
    if(orderType === "release_date") setOrderType("popularity");
    else setOrderType("release_date");
  }

  const changeOrder = () => {
    if(order === "desc") setOrder("asc");
    else setOrder("desc");
  }

  return (
    <>
      {[...moviesList, ...tvList].length >= 1 && (
        <div className="py-7">
          {filteredMovies.length >= 1 && (
            <div className="mb-7">
              <ScrollbarSlide
                title={`Filmes`}
                filter={
                  <DetailsLists.Filter
                    changeOrder={changeOrder}
                    orderType={orderType}
                    order={order}
                    changeOrderType={changeOrderType}
                  />
                }
              >
                {filteredMovies.map((item, i) => (
                  <Card
                    key={item.id * i}
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
          )}
          {filteredTv.length >= 1 && (
            <div className="mb-7">
              <ScrollbarSlide 
                list={tvList}
                title={`TV`}
                filter={
                  <DetailsLists.Filter
                    changeOrder={changeOrder}
                    orderType={orderType}
                    order={order}
                    changeOrderType={changeOrderType}
                  />
                }
              >
                {filteredTv.map((item, i) => (
                  <Card 
                  key={item.id * i}
                    title={item.name}
                    url={`/tv/${item.id}`}
                    className="w-[200px]"
                  >
                    <Card.Image image={item.poster_path} />
                    <Card.Info>
                      <h1 className="truncate text-xl font-semibold">{item.name}</h1>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-x-2">
                          <Star size={18} fill="#fff" />
                          <p className="font-medium">
                            {item.vote_average ? item.vote_average.toFixed(1) : "0"}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Badge className="px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]">
                            <span className="font-medium text-sm">{item.first_air_date?.slice(0, 4) || "?"}</span>
                          </Badge>
                        </div>
                      </div>
                    </Card.Info>
                  </Card>
                ))}
              </ScrollbarSlide>
            </div>
          )}
        </div>
      )}
    </>
  )
}

DetailsLists.Filter = function DetailsListsFilter ({
  changeOrder,
  orderType,
  order,
  changeOrderType
}: {
  changeOrder: () => void;
  orderType: string;
  order: string;
  changeOrderType: () => void;
}) {
  return (
    <div className="flex items-center gap-x-1 bg-outline p-1 rounded-full">
      <Button
        variant="destructive"
        className="rounded-full"
        size="sm"
        onClick={changeOrderType}
      >
        {orderType === "release_date" ? "Lançamento" : "Popularidade"}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={changeOrder}
      >
        {order === "desc" ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
      </Button>
    </div>
  )
}