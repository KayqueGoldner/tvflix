import { cn } from "@/lib/utils";

const ElementWithPoint = ({
  children,
  className,
  lastItem = false,
}: {
  children: React.ReactNode;
  className?: string;
  lastItem?: boolean;
}) => {
  return (
    <div className={cn(
      !lastItem && "relative pr-4 mr-2 sm:mr-4 after:absolute after:-right-[0px] after:sm:-right-[3px] after:top-1/2 after:-translate-y-2/4 after:w-[6px] after:h-[6px] after:bg-slate-300 after:rounded-full",
      lastItem && "relative",
      className,
    )}>
      {children}
    </div>
  );
}
 
export default ElementWithPoint;