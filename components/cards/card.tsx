import { Film } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  url?: string;
  className?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  onClick?: () => void;
}

const Card = ({ 
  children,
  title,
  url,
  className,
  target = "_self",
  onClick
}: CardProps) => {
  return (
    <div 
      className={cn(
        "relative w-full group",
        className
      )}
      title={title}
      onClick={onClick}
    >
      {url ? (
        <Link 
          href={url} 
          className="h-full w-full"
          target={target}
          scroll={false}
        >
          <div className="w-full h-full relative">
            {children}
          </div>
        </Link>
      ) : (
        <div className="w-full relative">
          {children}
        </div>
      )}
    </div>
  );
}

Card.Image = function cardImage({
  image,
  icon,
  className,
  imageClassName,
  hoverEffect = true,
}: {
  image: string;
  icon?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  hoverEffect?: boolean;
}) {
  return (
    <div className={cn(
      "relative w-full aspect-[2/3] rounded-[6px] overflow-hidden bg-outline",
      className
    )}>
      {image ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${image}`}
          alt="banner card"
          width={500}
          height={500}
          className={cn(
            "w-full h-full object-cover",
            imageClassName
          )}
          loading="lazy"
        />
      ): (
        <div className="w-full h-full flex items-center justify-center">
          {icon ? icon : <Film size={50} className="text-darkRed" />}
        </div>
      )}
      {hoverEffect && (
        <div className="absolute inset-0 group-hover:opacity-100 opacity-0 pointer-events-none bg-darkRed/20 transition" />
      )}
    </div>
  )
}


Card.Info = function cardInfo({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "py-2",
      className
    )}>
      {children}
    </div>
  )
}
 
export default Card;