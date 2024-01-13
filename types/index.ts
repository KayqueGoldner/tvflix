export interface Imovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  media_type: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ImovieExpanded extends Imovie {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: {
    id: number;
    name: string;
  }[];
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
  runtime: number;
  status: string;
  tagline: string;
  keywords: {
    keywords: {
      id: number;
      name: string;
    }[];
  }
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  casts: {
    cast: {
      id: number;
      gender: number;
      name: string;
      original_name: string;
      popularity: number;
      job: string;
      character: string;
      known_for_department: string;
      profile_path: string;
    }[];
    crew: {
      id: number;
      name: string;
      original_name: string;
      job: string;
      known_for_department: string;
      profile_path: string;
      popularity: number;
    }[];
  };
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  };
  recommendations: {
    results: Imovie[];
  },
}

export interface Itv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ItvWithMovie {
  backdrop_path?: string;
  first_air_date?: string;
  id?: number;
  name?: string;
  genre_ids?: number[];
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  adult?: boolean;
  original_title?: string;
  release_date?: string;
  media_type?: string;
  title?: string;
  video?: boolean;
  character?: string;
  credit_id?: string;
}

export interface Igenres {
  id: number;
  name: string;
}

export interface ItvExpanded {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  };
  recommendations: {
    page: number;
    results: {
      adult: boolean;
      backdrop_path: string;
      id: number
      name: string;
      original_language: string;
      original_name: string;
      overview: string;
      poster_path: string;
      media_type: string;
      genre_ids: number[];
      popularity: number;
      first_air_date: string;
      vote_average: number;
      vote_count: number;
      origin_country: string[];
    }[];
    total_pages: number;
    total_results: number;
  }
}

export interface Ipeople {
  page: number;
  results:  {
    adult: boolean;
    gender: number;
    id: number;
    known_for: {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number;
      id: number;
      media_type: string;
      original_language: string;
      original_title: string;
      overview: string;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
  }[];
  total_pages: number;
  total_results: number;
}

export interface Iperson {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  images: {
    profiles: {
      aspect_ratio: number;
      height: number;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
  },
  movie_credits: {
    cast: {
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      vote_average: number;
      vote_count: number;
      character: string;
      credit_id: string;
    }[];
    crew: {
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      vote_average: number;
      vote_count: number;
      character: string;
      credit_id: string;
    }[];
  },
  tv_credits: {
    cast: {
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_name: string;
      overview: string;
      popularity: number;
      poster_path: string;
      first_air_date: string;
      name: string;
      vote_average: number
      vote_count: number;
      character: string;
      credit_id: string;
      episode_count: number;
    }[];
    crew: {
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_name: string;
      overview: string;
      popularity: number;
      poster_path: string;
      first_air_date: string;
      name: string;
      vote_average: number
      vote_count: number;
      character: string;
      credit_id: string;
      episode_count: number;
    }[];
  }
}

export interface Isearch {
  backdrop_path?: string;
  first_air_date?: string;
  id?: number;
  name?: string;
  genre_ids?: number[];
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  adult?: boolean;
  original_title?: string;
  release_date?: string;
  media_type?: "movie" | "tv" | "person" | "collection" | "multi";
  title?: string;
  video?: boolean;
  character?: string;
  credit_id?: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: string;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string;
  profile_path: string;
}

export interface ItvSeason {
  _id: string;
  air_date: string;
  episodes: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: {
      job: string;
      department: string;
      credit_id: string;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
    guest_stars: {
      character: string;
      credit_id: string;
      order: number;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
  }[],
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
  aggregate_credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      roles: {
        credit_id: string;
        character: string;
        episode_count: number;
      }[];
      total_episode_count: number;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      jobs: {
        credit_id: string;
        job: string;
        episode_count: number;
      }[];
      department: string;
      total_episode_count: number;
    }[];
  },
  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
      credit_id: string;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
    }[];
  },
  images: {
    posters: string[];
  },
  videos: {
    results: {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  }
}

export interface ItvEpisode {
  air_date: string;
  crew: {
    job: string;
    department: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
  episode_number: number;
  guest_stars: {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
  name: string;
  overview: string;
  id: number;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  };
  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
      credit_id: string;
      order: number;
    }[];
    crew: {
      job: string;
      department: string;
      credit_id: string;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
    guest_stars: {
      character: string;
      credit_id: string;
      order: number;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
  }
}

export interface ImovieCollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Imovie[];
}

export interface ImovieProviders {
  id: number;
  results: {
    BR: {
      link: string;
      flatrate: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
      buy: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
      rent: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
      ads: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
    }
  };
}