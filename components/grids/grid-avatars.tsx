import { cn } from "@/lib/utils";

const GridAvatars = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) => {
  return (
    <div className={cn(
      "bg-outline px-3 py-4",
      className
    )}>
      {title && (
        <div className="w-max pr-3">
          <h1 className="leading-none font-semibold text-2xl capitalize mb-5">{title}</h1>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-3">
        {children}
      </div>
    </div>
  );
}
 
export default GridAvatars;