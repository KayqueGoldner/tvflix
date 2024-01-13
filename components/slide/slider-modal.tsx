"use client";

import { SliderModalList } from './slider-modal-list';
import ScrollbarSlide from './scrollbar-slide';

interface DetailSliderProps {
  name?: string;
  key?: string;
  site?: string;
  id?: string;
  aspect_ratio?: number;
  height?: number;
  file_path?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

const SliderModal = ({
  content,
  title,
  type,
  className
}: {
  content: DetailSliderProps[];
  title: string;
  type: "videos" | "images";
  className?: string;
}) => {
  const contentList = type === "videos" ? content.filter(item => item.site === "YouTube") : content;

  return (
    <div className="mt-5 space-y-1.5">
      <ScrollbarSlide
        title={title}
        className={className}
      >
        {contentList.map((item, i) => (
          <SliderModalList
            content={contentList}
            data={item}
            type={type}
            key={item.id || i}
          />
        ))}
      </ScrollbarSlide>
    </div>
  );
}
 
export default SliderModal;