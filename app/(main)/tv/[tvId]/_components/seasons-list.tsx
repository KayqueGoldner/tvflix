interface SeasonsList {
  content: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    season_number: number;
    vote_average: number;
  };
}

const SeasonsList = ({
  content,
}: SeasonsList) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl">
        Temporada {content.season_number}
      </h1>
      <h1 className="text-xl">
        <span className="text-darkRed font-semibold mr-1.5">Título:</span>
        {content.name}
      </h1>
    </div>
  );
}
 
export default SeasonsList;