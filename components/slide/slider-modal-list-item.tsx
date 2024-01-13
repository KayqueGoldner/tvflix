"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react"
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto', containScroll: 'trimSnaps' }

export const SliderModalListItem = ({
  content,
  type,
  handleContentId,
  state
} : {
  content: DetailsSliderModalProps[];
  type: "videos" | "images";
  handleContentId: (id: string) => void;
  state: string | undefined;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full flex items-center gap-x-2">
      <div className="w-full flex items-center justify-between relative space-y-2">
        <div className="px-1.5">
          <Button 
            variant="destructive"
            size="sm"
            onClick={scrollPrev} 
            disabled={prevBtnDisabled}
            className="rounded-full p-0 w-10 h-10 md:h-12 md:w-12"
          >
            <ArrowLeft />
          </Button>
        </div>
        <div className="embla__viewport w-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container">
            {content.map((item, i) => (
              <button
                key={i}
                className="min-w-max h-16 xs:h-24 m-1 cursor-pointer hover:scale-95 hover:disabled:scale-100 rounded-[10px] overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:ring-2 disabled:ring-white transition"
                onClick={() => handleContentId(item.key || item.file_path || "")}
                disabled={state === item.key! || state === item.file_path!}
              >
                {type === "videos" ? (
                  <div className="relative h-full w-full">
                    <img
                      src={`https://img.youtube.com/vi/${item.key}/0.jpg`}
                      width={item.width}
                      height={item.height}
                      className="w-full h-full aspect-video object-cover" 
                      alt={item.file_path!}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
                    width={item.width}
                    height={item.height}
                    className="w-full h-full" 
                    alt={item.file_path!}
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="px-1.5">
          <Button 
            variant="destructive"
            size="sm"
            onClick={scrollNext} 
            disabled={nextBtnDisabled}
            className="rounded-full p-0 w-10 h-10 md:h-12 md:w-12"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  )
}