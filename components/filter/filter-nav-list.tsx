import React, { Fragment } from "react";
import { useSearchParams } from "next/navigation";

import { Igenres } from "@/types";
import { 
  languagesList,
  mediaTypeList, 
  sortByList
} from "@/constants";

import { FilterNavItem } from "./filter-nav-item";

interface QueryFilterComponentProps {
  genresList: Igenres[];
  deleteQueryFilter: (param: string, genreIds?: number[], genre?: any ) => void;
}

export const FilterNavList = ({ 
  genresList, 
  deleteQueryFilter,
}: QueryFilterComponentProps) => {
  const searchParams = useSearchParams();
  
  return (
    <>
      {Array.from(searchParams.entries()).map(([param, value]) => {
        let query;
        let genreIds: number[];
        
        switch(param) {
          case "with_genres":
            genreIds = value.split(',').map(id => parseInt(id, 10));
            query = genreIds.map(genreId => {
              return genresList.find(item => item.id === genreId);
            });
            break;
          case "sort_by":
            query = sortByList.filter(item => item.value === value);
            break;
          case "media_type":
            query = mediaTypeList.filter(item => item.value === value);
            break;
          case "with_original_language":
            query = languagesList.filter(item => item.value === value);
            break;
        }

        return (
          <Fragment key={value}>
            {query?.map((genre, index) => (
              <FilterNavItem
                key={index}
                onClick={() => deleteQueryFilter(param, genreIds, genre)}
                label={genre?.name!}
              />
            ))}
          </Fragment>
        );
      })}
    </>
  );
};

