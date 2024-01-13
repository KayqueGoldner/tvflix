import { cn } from "@/lib/utils";

interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const GridLayout = ({
  children,
  className
}: GridLayoutProps) => {
  return (
    <div 
      className={cn(
        "h-full block md:grid md:grid-cols-gridLayout-md lg:grid-cols-gridLayout-lg gap-3 py-3",
        className
      )}
    >
      {children}
    </div>
  )
}