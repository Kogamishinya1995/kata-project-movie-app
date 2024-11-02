export interface Movie {
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
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieApi {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

export interface MovieProps {
  title: string;
  release_date: string;
  genres: number[];
  description: string;
  poster_path: string;
}
