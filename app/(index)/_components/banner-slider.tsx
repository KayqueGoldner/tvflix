"use client";

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from 'embla-carousel-autoplay'

import { NextButton, PrevButton } from '@/components/slide/scrollbar-slide-btns';
import { Igenres, ItvWithMovie } from "@/types";

import { BannerSlideItem } from "./banner-slider-item";

const OPTIONS: EmblaOptionsType = {};

export const BannerSlide = ({
  data,
  genres
}: {
  data: ItvWithMovie[];
  genres: Igenres[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay()]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView);
      };
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

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

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('slidesInView', updateSlidesInView)
    emblaApi.on('reInit', () => {
      updateSlidesInView(emblaApi);
      onSelect(emblaApi);
    });
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect, updateSlidesInView]);

  return (
    <div className="embla rounded-[15px] relative" ref={emblaRef}>
      <div className="embla__container rounded-[15px]">
        {data.map((item, index) => (
          <BannerSlideItem
            content={item}
            genres={genres.filter(genre => item.genre_ids?.find(genreId => genreId === genre.id))}
            inView={slidesInView.indexOf(index) > -1}
            key={item.id}
          />
        ))}
      </div>
      <div className="flex items-center gap-x-1 absolute top-5 right-5">
        <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
        <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
}