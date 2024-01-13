"use client";

import { useQuery } from "@tanstack/react-query";

import { Imovie } from "@/types";
import { fetcher } from "@/lib/fetcher";

import Card from "../cards/card";

interface SearchListProps {
  closeModal: () => void;
}

export const SearchList = ({
  closeModal
}: SearchListProps) => {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=pt-BR";
  const { data } = useQuery<{ results: Imovie[] }, Error>({ 
    queryKey: ['searchModaList'], 
    queryFn: () => fetcher(url),
  });

  return (
    <div className="space-y-2">
      <h1 className="uppercase font-medium text-sm tracking-wider">Trending</h1>
      <div className="grid grid-cols-2 gap-1 h-full">
        {data?.results ? data.results.slice(0, 4).map(item => (
          <Card 
            key={item.id}
            title={item.title} 
            url={`/filme/${item.id}`}
            className="w-28"
            onClick={closeModal}
          >
            <Card.Image image={item.poster_path} />
          </Card>
        )): (
          <SearchList.Skeleton />
        )}
      </div>
    </div>
  )
}

SearchList.Skeleton = function SearchListSkeleton() {
  return (
    <>
      <div className="w-28 h-[168px] bg-surface animate-pulse rounded-[6px]" />
      <div className="w-28 h-[168px] bg-surface animate-pulse rounded-[6px]" />
      <div className="w-28 h-[168px] bg-surface animate-pulse rounded-[6px]" />
      <div className="w-28 h-[168px] bg-surface animate-pulse rounded-[6px]" />
    </>
  )
}