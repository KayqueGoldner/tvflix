"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react"
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

import { ItvWithMovie } from "@/types";
import { cn } from "@/lib/utils";

import {
  PrevButton,
  NextButton
} from './scrollbar-slide-btns';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto', containScroll: 'trimSnaps' }

const ScrollbarSlide = ({
  children,
  filter,
  title,
  list,
  className
}: {
  children?: React.ReactNode;
  filter?: React.ReactNode;
  title?: string;
  list?: Omit<ItvWithMovie, "genre_ids">[];
  className?: string;
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
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex items-center justify-between py-3",
        !title && !children && "justify-end mb-2",
      )}>
        <div className="flex items-center gap-x-3">
          {title && (
            <h1 className="text-xl sm:text-2xl capitalize font-semibold leading-5">{title}</h1>
          )}
          {filter}
        </div>
        <div className="flex items-center gap-x-1">
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="embla relative space-y-2" ref={emblaRef}>
        <div className="embla__container">
          {children}
        </div>
        <div className="embla__progress bg-outline">
          <div
            className="embla__progress__bar bg-darkRed"
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
    </div>
  );
}
 
export default ScrollbarSlide;