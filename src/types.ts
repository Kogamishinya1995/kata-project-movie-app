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
  rating: number;
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
  rateMovie: (id: number, session: string, starsCount: number) => void;
  movieId: number;
  sessionToken: string;
  rating?: number;
  vote_average: number;
}

export interface GuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface RatedMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
