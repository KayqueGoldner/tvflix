"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar/sidebar";
import SearchNav from "@/components/search/search";
import { Separator } from "@/components/ui/separator";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="link"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="bg-outline p-0 pt-12 border-0 w-full xs:w-96"
      >
        <div className="border-0 h-full flex flex-col overflow-y-auto">
          <div className="px-2">
            <SearchNav 
              className="w-full"
              closeSidebar={closeSidebar}
            />
          </div>
          <Separator className="my-6" />
          <div className="grow">
            <Sidebar 
              className="pt-0"
              closeSidebar={closeSidebar}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
 
export default MobileSidebar;