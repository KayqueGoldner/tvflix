export const DetailsSliderCard = ({
  type,
  content,
  className
} : {
  type: "images" | "videos";
  content: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      {type === "videos" ? (
        <iframe 
          id="ytplayer"
          src={`https://www.youtube.com/embed/${content}?autoplay=1&amp;theme=dark&amp;color=white&amp;rel=0`}
          allowFullScreen
          className="aspect-video w-full"
          loading="lazy"
        />
      ): (
        <img
          src={`https://image.tmdb.org/t/p/original/${content}`}
          className="w-60 h-full block mx-auto"
          alt="image"
          loading="lazy"
        />
      )}
    </div>
  )
}