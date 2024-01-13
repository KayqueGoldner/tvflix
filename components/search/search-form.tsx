"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "query-string";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { mediaTypeList } from "../../constants";
import { Switch } from "../ui/switch";

const FormSchema = z.object({
  query: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres.",
  }),
  media_type: z.string().optional(),
  include_adult: z.boolean().optional(),
});

export const SearchForm = ({
  closeModal
}: {
  closeModal: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
      media_type: "",
      include_adult: false,
    },
  });

  const onSubmit = () => {
    const { query, ...formValues } = form.getValues();

    const filteredUrl = qs.stringifyUrl({
      url: `/pesquisar/${query.replace(/ /g, '+')}`,
      query: { ...formValues, page: 1 },
    }, { arrayFormat: "comma", skipEmptyString: true });

    closeModal();
    router.replace(filteredUrl);
  };

  useEffect(() => {
    function formatarRota(caminho: string): string | null {
      const rotas = caminho.split('/');
    
      if (rotas.length === 3 && caminho.includes('pesquisar')) {
        const rota = rotas[2].replace(/\+/g, ' ');
        return rota;
      }
    
      return null;
    }

    form.reset({
      query: formatarRota(pathname) || "",
      media_type: mediaTypeList.find(item => item.value === searchParams.get("media_type"))?.value || "",
      include_adult: searchParams.get("include_adult") ? searchParams.get("include_adult") === "false" ? false : true : false,
    });
  }, [searchParams]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="rounded-[5px] text-base bg-surface border-0 focus-visible:ring-darkRed transition"
                  placeholder="Pesquisar"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
        <div className="my-4 space-y-3">
          <FormField
            control={form.control}
            name="media_type"
            render={({ field }) => (
              <FormItem className="space-y-0 text-left">
                <Select onValueChange={field.onChange}>
                  <FormLabel className="leading-10">Tipo</FormLabel>
                  <FormControl>
                    <SelectTrigger className="bg-darkRed/30 border-0 ring-0 rounded-[5px]">
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
        </div>
        <Button 
          type="submit"
          className="w-full mt-auto bg-darkRed hover:bg-darkRed/80 rounded-[5px]"
        >
          <p className="text-white font-medium text-base">
            Pesquisar
          </p>
        </Button>
      </form>
    </Form>
  )
}