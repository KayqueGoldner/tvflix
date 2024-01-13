import Link from "next/link";
import { ArrowUpRight, LinkIcon, User } from "lucide-react";

import DetailsSlider from "@/components/slide/slider-modal";
import ElementWithPoint from "@/components/element-with-point";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Iperson } from "@/types";
import { GridLayout } from "@/components/grids/grid-layout";
import { LinkBtn } from "@/components/link-btn";
import { cn } from "@/lib/utils";

import { DetailsLists } from "./details-lists";

export const DetailsLayout = ({
  data,
}: {
  data: Iperson;
}) => {
  const formatedBirthday = data.birthday && new Date(data.birthday).toLocaleDateString("pt-br", { timeZone: "utc" });
  const formatedDeathday = data.deathday && new Date(data.deathday).toLocaleDateString("pt-br", { timeZone: "utc" });
  function getAge() {
    if(!formatedBirthday) return;

    let partesData = formatedBirthday.split("/");
    let dataNascimentoFormatada = new Date(Number(partesData[2]), Number(partesData[1]) - 1, Number(partesData[0]));
    let hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimentoFormatada.getFullYear();
    let mesAtual = hoje.getMonth();
    let diaAtual = hoje.getDate();

    if (mesAtual < dataNascimentoFormatada.getMonth() || (mesAtual === dataNascimentoFormatada.getMonth() && diaAtual < dataNascimentoFormatada.getDate())) {
      idade--;
    }

    return idade;
  };
  function getAgeAtDeath() {
    if(!formatedBirthday || !formatedDeathday) return;

    let partesDataNascimento = formatedBirthday.split("/");
    let dataNascimentoFormatada = new Date(Number(partesDataNascimento[2]), Number(partesDataNascimento[1]) - 1, Number(partesDataNascimento[0]));
  
    let partesDataFalecimento = formatedDeathday.split("/");
    let dataFalecimentoFormatada = new Date(Number(partesDataFalecimento[2]), Number(partesDataFalecimento[1]) - 1, Number(partesDataFalecimento[0]));
  
    let idade = dataFalecimentoFormatada.getFullYear() - dataNascimentoFormatada.getFullYear();
    let mesFalecimento = dataFalecimentoFormatada.getMonth();
    let diaFalecimento = dataFalecimentoFormatada.getDate();
  
    if (mesFalecimento < dataNascimentoFormatada.getMonth() || (mesFalecimento === dataNascimentoFormatada.getMonth() && diaFalecimento < dataNascimentoFormatada.getDate())) {
      idade--;
    }
  
    return idade;
  };

  return (
    <div>
      <GridLayout>
        <div className="relative w-full mb-5 md:m-0 md:h-full">
          <div className="block w-full xs:w-80 md:w-full md:sticky top-3 left-0 bg-outline rounded-[10px] overflow-hidden">
            {data.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${data.profile_path}`}
                width={500}
                height={640}
                alt={data.name}
                className="w-full"
              />
            ): (
              <div className="w-full h-[360px] flex items-center justify-center">
                <User 
                  size={75}
                  className="text-darkRed"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-max md:px-3 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-semibold">{data.name}</h1>
          {data.homepage && (
            <Button
              className="p-0 my-1.5"
              variant="link"
              asChild>
              <Link 
                href={data.homepage}
                className="flex gap-x-2"
                target="_blank"
              >
                <LinkIcon size={18} />
                <span>{data.homepage}</span>
              </Link>
            </Button>
          )}
          <div className={cn(
            "flex items-center flex-wrap gap-y-2 my-4",
            data.homepage && "mt-0 mb-4"
          )}>
            {data.birthday && (
              <ElementWithPoint>
                <p className="text-lg whitespace-nowrap">
                  {data.deathday ? (
                    <>
                      {`${formatedBirthday} - ${formatedDeathday} (${getAgeAtDeath()} anos)`}
                    </>
                  ) : (
                    <>
                      {`${formatedBirthday} (${getAge()} anos)`}
                    </>
                  )}
                </p>
              </ElementWithPoint>
            )}
            <ElementWithPoint lastItem={data?.imdb_id ? false : true}>
              <Badge className="bg-darkRed hover:bg-darkRed/80 rounded-[5px]">
                <p className="font-medium text-base leading-5 text-white">{data.popularity.toFixed(1)}</p>
              </Badge>
            </ElementWithPoint>
            {data.imdb_id && (
              <ElementWithPoint lastItem>
                <LinkBtn 
                  href={`https://www.imdb.com/name/${data?.imdb_id}`}
                  target={"_blank"}
                  className="px-3"
                >
                  <span className="leading-7 font-medium text-base">
                    IMDB
                  </span>
                  <ArrowUpRight strokeWidth={2.2} className="w-5 h-5" />
                </LinkBtn>
              </ElementWithPoint>
            )}
          </div>
          {data.biography && (
            <p className="font-medium text-lg">
              {data.biography}
            </p>
          )}
          {data.images.profiles.length >= 1 && (
            <DetailsSlider
              content={data.images.profiles} 
              title="Imagens"
              type="images"
            />
          )}
        </div>
      </GridLayout>
      <DetailsLists
        moviesList={[...data.movie_credits.cast, ...data.movie_credits.crew]}
        tvList={[...data.tv_credits.cast, ...data.tv_credits.crew]}
      />
    </div>
  );
}
