import { SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

export const ResourceNotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-3">
      <SearchX
        className="text-darkRed h-16 w-16"
      />
      <h1 className="text-lg font-medium">
        O recurso que você solicitou não foi encontrado.
      </h1>
      <Button
        variant="destructive"
        className="py-1.5 px-3 rounded-[5px] text-base"
      >
        <Link href="/">
          Voltar para página inicial
        </Link>
      </Button>
    </div>
  )
}