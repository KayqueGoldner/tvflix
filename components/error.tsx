import Link from "next/link";

import { Button } from "./ui/button";

export const Error = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-3 items-center pt-10">
      <div className="text-center">
        <h1 className="text-6xl">Oops!</h1>
        <h3 className="font-medium leading-[2.7]">ALGO DEU ERRADO.</h3>
      </div>
      <Button
        variant="destructive"
        className="rounded-[10px] text-base px-5"
        asChild
      >
        <Link href="/">
          Voltar para página inicial
        </Link>
      </Button>
    </div>
  )
}