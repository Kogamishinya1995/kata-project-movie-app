import { useEffect, useState } from "react";

type MovieProps = {
  imageUrl: string;
  movieTitle: string;
  releaseDate: string;
  movieDescription: string;
};

type ApiResponse = {
  page: number;
  results: MovieApi[];
};

type MovieApi = {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  overview: string;
};

type MovieData = {
  id: number;
  imageUrl: string;
  movieTitle: string;
  releaseDate: string;
  movieDescription: string;
};

const Movie: React.FC<MovieProps> = ({
  imageUrl,
  movieTitle,
  releaseDate,
  movieDescription,
}) => (
  <div className="movie-item">
    <img className="movie-item__poster" src={imageUrl} alt={movieTitle} />
    <div className="movie-item__description">
      <h1>{movieTitle}</h1>
      <p>{releaseDate}</p>
      <p>{movieDescription}</p>
    </div>
  </div>
);
const App = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const url = "https://api.themoviedb.org/3/search/movie?query=return&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVjMzVlY2RmZTk2YTgwOWJkODkwMmZiMTNkOWIwOCIsIm5iZiI6MTczMDAzMjA0Mi4yODc1MDUsInN1YiI6IjY3MWUwMDAxYTRhYzhhNDMyYzVjOTUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJQk2MObjCEutcgIxjjBW-SkV9xayN7ylR3VaASrVbg",
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((json) => {
        const fetchedMovies: MovieData[] = json.results.map((movie) => ({
          id: movie.id,
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movieTitle: movie.original_title,
          releaseDate: movie.release_date,
          movieDescription: movie.overview,
        }));
        setMovies(fetchedMovies);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch movies.</p>;

  return (
    <div className="movie-container">
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          imageUrl={movie.imageUrl}
          movieTitle={movie.movieTitle}
          releaseDate={movie.releaseDate}
          movieDescription={movie.movieDescription}
        />
      ))}
    </div>
  );
};

export default App;
