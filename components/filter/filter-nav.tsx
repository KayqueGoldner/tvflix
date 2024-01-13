"use client";

import { useEffect } from "react";
import { 
  useSearchParams, 
  usePathname,
  useRouter,
} from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlignCenter, Trash } from "lucide-react";
import qs from "query-string";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Igenres } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

import {
  sortByList,
  mediaTypeList,
  languagesList
} from "@/constants";
import { FilterNavList } from "./filter-nav-list";
import Link from "next/link";

const FormSchema = z.object({
  with_genres: z.array(z.number()),
  sort_by: z.string(),
  media_type: z.string().optional(),
  with_original_language: z.string().optional(),
  include_adult: z.boolean().optional(),
});

const FilterNav = ({
  genresList,
}: {
  genresList: Igenres[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      with_genres: searchParams.get("with_genres")?.split(",").map(id => parseInt(id, 10)) || [],
      sort_by: searchParams.get("sort_by") || "",
      media_type: searchParams.get("media_type") || "",
      with_original_language: searchParams.get("with_original_language") || "",
      include_adult: searchParams.get("include_adult") ? searchParams.get("include_adult") === "false" ? false : true : false,
    }
  });

  const createQueryString = async (data: z.infer<typeof FormSchema>) => {
    const formValues = form.getValues();

    const filteredUrl = qs.stringifyUrl({
      url: pathname,
      query: { ...formValues, page: 1 },
    }, { arrayFormat: "comma", skipEmptyString: true });

    router.replace(filteredUrl);
  };

  const deleteQueryFilter = (
    param: string,
    genreIds?: number[],
    genreValue?: any,
  ) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    const clearQueryParam = (paramName: any) => {
      updatedSearchParams.delete(paramName);
      form.setValue(paramName, "");
      const filteredUrl = qs.exclude(window.location.href, (name, value) => name === paramName );
      const url = qs.stringifyUrl({
        url: filteredUrl,
        query: { page: 1 }
      })
      window.location.replace(url);
    };

    if (genreIds) {
      const newQuery = genreIds.filter(genreId => genreId !== genreValue?.id);
      if (newQuery.length) {
        updatedSearchParams.set(param, String(newQuery));
        form.setValue("with_genres", newQuery);
        const filteredUrl = qs.stringifyUrl({
          url: window.location.href,
          query: { with_genres: String(newQuery), page: 1 }
        });
        window.location.replace(filteredUrl);
      } else {
        updatedSearchParams.delete(param);
        form.setValue("with_genres", []);
        const updatedUrl = qs.exclude(window.location.href, (name, value) => name === param);
        const filteredUrl = qs.stringifyUrl({
          url: updatedUrl,
          query: { page: 1 },
        });
        window.location.replace(filteredUrl);
      }
    } else {
      clearQueryParam(param);
    }
  };

  useEffect(() => {
    form.reset({
      with_genres: searchParams.get("with_genres")?.split(",").map(id => parseInt(id, 10)) || [],
      sort_by: searchParams.get("sort_by") || "",
      media_type: searchParams.get("media_type") || "",
      with_original_language: searchParams.get("with_original_language") || "",
      include_adult: searchParams.get("include_adult") ? searchParams.get("include_adult") === "false" ? false : true : false,
    });
  }, [searchParams]);

  return (
    <Sheet>
      <div className="space-y-3">
        <div className="flex gap-x-3 mb-2 sm:mb-0">
          <SheetTrigger asChild>
            <Button className="flex items-center gap-x-2 rounded-[10px]">
              <span className="text-base">Filtros</span>
              <AlignCenter className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          {searchParams.size > 3 && (
            <Button 
              className="flex items-center gap-x-2 rounded-[10px]"
              variant="secondary"
              title="remover todos os filtros"
              asChild
            >
              <Link href={pathname}>
                <span className="text-base">Limpar</span>
                <Trash className="w-5 h-5" />
              </Link>
            </Button>
          )}
        </div>
        {searchParams.size > 0 && (
          <div className="flex items-center gap-2 w-full flex-wrap">
            <FilterNavList 
              deleteQueryFilter={deleteQueryFilter} 
              genresList={genresList}
            />
          </div>
        )}
      </div>
      <SheetContent 
        className="w-full sm:w-1/2 pt-10 bg-outline border-0"
      >
        <ScrollArea className="h-full">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(createQueryString)}
              className="flex flex-col gap-y-3 pl-2 pr-4"
            >
              {!pathname.includes("pesquisar") && (
                <>
                  <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Gêneros</AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="with_genres"
                        render={() => (
                          <FormItem>
                            {genresList.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="with_genres"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          className="h-5 w-5"
                                          checked={
                                            field.value?.includes(item.id)
                                          }
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: number) => value !== item.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal text-base">
                                        {item.name}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  </Accordion>
                  <FormField
                    control={form.control}
                    name="sort_by"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ordenar por</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="bg-outline">
                              <SelectValue
                                placeholder={sortByList.find(item => item.value === searchParams.get("sort_by"))?.name || "Ordenar por"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-surface">
                            <ScrollArea className="h-full max-h-[400px]">
                              {sortByList.map((item, i) => (
                                <SelectItem
                                  key={i}
                                  value={item.value}
                                  className="capitalize hover:bg-darkRed focus:bg-darkRed"
                                  disabled={sortByList.find(item => item.value === searchParams.get("sort_by"))?.value === item.value}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </>
              )}
              {pathname.includes("pesquisar") && (
                <FormField
                  control={form.control}
                  name="media_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-outline">
                            <SelectValue 
                              placeholder={mediaTypeList.find(item => item.value === searchParams.get("media_type"))?.name || "Tipo"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-surface">
                          <ScrollArea className="h-full max-h-[400px]">
                            {mediaTypeList.map((item, i) => (
                              <SelectItem
                                key={i}
                                value={item.value}
                                className="capitalize hover:bg-darkRed focus:bg-darkRed"
                                disabled={mediaTypeList.find(item => item.value === searchParams.get("media_type"))?.value === item.value || item.value === form.getValues("media_type")}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              {!pathname.includes("pesquisar") && (
                <FormField
                  control={form.control}
                  name="with_original_language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma original</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-outline">
                            <SelectValue
                              placeholder={languagesList.find(item => item.value === searchParams.get("with_original_language"))?.name || "Idioma original"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-surface">
                          <ScrollArea className="h-full max-h-[400px]">
                            {languagesList.map((item, i) => (
                              <SelectItem
                                key={i}
                                value={item.value}
                                className="capitalize hover:bg-darkRed focus:bg-darkRed"
                                disabled={languagesList.find(item => item.value === searchParams.get("with_original_language"))?.value === item.value}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="include_adult"
                render={({ field }) => (
                  <FormItem 
                    className="flex gap-x-3"
                  >
                    <FormLabel className="leading-10">Incluir conteúdo adulto</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                className="w-full mt-auto bg-darkRed hover:bg-darkRed/80 rounded-[5px]"
                asChild
              >
                <SheetTrigger>
                  <p className="text-white text-base font-medium">
                    Filtrar
                  </p>
                </SheetTrigger>
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
 
export default FilterNav;