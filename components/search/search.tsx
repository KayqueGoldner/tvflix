"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SearchList } from "./search-list";
import { SearchForm } from "./search-form";
import { cn } from "@/lib/utils";

interface SearchNavProps {
  className?: string;
  closeSidebar?: () => void;
}

const SearchNav = ({
  className,
  closeSidebar
}: SearchNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    if(closeSidebar) {
      closeSidebar();
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            role="button"
            className={cn(
              "relative w-[230px] h-12 flex gap-x-3 items-center justify-between bg-zinc-800 px-4 rounded-[7px] cursor-text",
              className
            )}
          >
            <div className="flex items-center gap-x-2">
              <Search 
                className="text-neutral-500 h-5 w-5"
              />
              <p className="text-neutral-400">Pesquisar</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="border-0 bg-outline max-w-3xl">
          <div className="flex items-start gap-x-4">
            <div className="hidden sm:block">
              <SearchList closeModal={closeModal} />
            </div>
            <div className="grow pt-7">
              <SearchForm closeModal={closeModal} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
 
export default SearchNav;