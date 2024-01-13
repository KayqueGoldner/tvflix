import { X } from "lucide-react";

import { Button } from "@/components/ui/button"

interface FilterNavItemProps {
  onClick: () => void;
  label: string;
}

export const FilterNavItem = ({
  onClick,
  label
}: FilterNavItemProps) => {
  return (
    <Button
      variant="outline"
      className="max-w-[222px] hover:max-w-full space-x-2 transition-all motion-reduce:transition-none duration-300 ease-in-out"
      onClick={onClick}
      title="remover filtro"
    >
      <span className="text-base truncate">{label}</span>
      <X  className="shrink-0 w-5 h-5" />
    </Button>
  )
}