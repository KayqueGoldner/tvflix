import { ImovieProviders } from "@/types";
import { cn } from "@/lib/utils";
import Card from "@/components/cards/card";
import { fetcher } from "@/lib/fetcher";

const WatchProviders = async ({
  url,
  className
}: {
  url: string;
  className?: string;
}) => {
  const content: ImovieProviders = await fetcher(url);
  const regionObject = content.results?.BR;
  const providerLink = regionObject?.link;

  const regionList = [
    {
      title: "Alugar",
      list: regionObject?.rent || [],
    },
    {
      title: "Comprar",
      list: regionObject?.buy || [],
    },
    {
      title: "Stream",
      list: regionObject?.flatrate || [],
    },
    {
      title: "Propagandas",
      list: regionObject?.ads || [],
    },
  ];

  return (
    <>
      {regionObject && (
        <div className={cn(
          "bg-outline/70 p-3 rounded-[10px]",
          className
        )}>
          <div className="flex flex-col gap-y-3">
            {regionList.map((item) => {
              if(item.list.length > 0) {
                return (
                  <div key={item.title} className="flex flex-col gap-y-1.5">
                    <h1 className="text-lg font-medium capitalize">{item.title}</h1>
                    <div className="flex gap-3 flex-wrap">
                      {item.list.map((prov, i) => (
                        <Card
                          key={prov.provider_id * i}
                          title={prov.provider_name}
                          className="block w-14 h-14 overflow-hidden"
                          url={providerLink}
                          target="_blank"
                        >
                          <Card.Image 
                            image={prov.logo_path}
                            className="rounded-[15px] aspect-auto"
                          />
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}
 
export default WatchProviders;