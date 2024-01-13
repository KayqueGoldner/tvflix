"use client";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { DetailsSliderCard } from "./details-slider-card";
import { SliderModalListItem } from "./slider-modal-list-item";

interface DetailsSliderModalProps {
  name?: string;
  key?: string;
  id?: string;
  aspect_ratio?: number;
  height?: number;
  file_path?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export const SliderModalList = ({
  type,
  data,
  content
}: {
  type: "videos" | "images";
  data: DetailsSliderModalProps;
  content: DetailsSliderModalProps[];
}) => {
  const [contentId, setContentId] = useState(type === "videos" ? data?.key : data?.file_path);

  const changeContentId = (id: string) => {
    setContentId(id);
  }

  useEffect(() => {
    setContentId(type === "videos" ? data.key : data.file_path);
  }, [data?.key, data?.file_path, type]);

  const elementTypeUrl = type === "videos"
    ? `https://img.youtube.com/vi/${data.key}/0.jpg`
    : `https://image.tmdb.org/t/p/original/${data.file_path}`;

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "shrink-0",
          type === "videos" && "w-full xl:w-[500px] rounded-[10px] overflow-hidden",
          type === "images" && "w-[220px] h-[340px]"
        )}
        onClick={() => setContentId(type === "videos" ? data?.key : data?.file_path)}
      >
        <div className="relative h-full w-full bg-outline">
          <img
            src={elementTypeUrl}
            width={data.width}
            height={data.height}
            className={cn(
              "w-full h-full",
              type === "videos" && "aspect-video object-cover",
            )}
            alt={data.file_path!}
            loading="lazy"
          />
          {type === "videos" && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center bg-darkRed rounded-full animate-pulse">
              <Play
                size={40}
                className="text-white ml-2"
              />
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent 
        className={cn(
          "max-w-3xl gap-2 border-0 bg-outline p-4 pt-10 pb-0 overflow-hidden",
          content.length <= 1 && "pb-3"
        )}
      >
        <DetailsSliderCard
          content={contentId!}
          type={type}
        />
        {content.length > 1 && (
          <DialogFooter className="justify-start sm:justify-start flex-row overflow-hidden py-2">
            <SliderModalListItem
              content={content}
              state={contentId}
              handleContentId={changeContentId}
              type={type}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}