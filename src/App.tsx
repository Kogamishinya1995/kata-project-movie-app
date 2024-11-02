import { useEffect, useState } from "react";
import MovieItem from "@Components/Movie.tsx";
import shortenDescription from "@Utils/shortenDescription.ts";
import { MovieApi } from "./types.ts";

const App = () => {
  const url = "https://api.themoviedb.org/3/search/movie?query=russia";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVjMzVlY2RmZTk2YTgwOWJkODkwMmZiMTNkOWIwOCIsIm5iZiI6MTczMDQ4MDk3Mi42NjU3ODU4LCJzdWIiOiI2NzFlMDAwMWE0YWM4YTQzMmM1Yzk1MDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GuwoEE_PIEy9QyueO1fk_Butq1nM2qTvo-EY6NjTbrE",
    },
  };

  const [movieState, setMovieState] = useState<MovieApi>();

  console.log("state", movieState?.results);

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json: MovieApi) => {
        setMovieState(json);
        console.log(json);
      })
      .catch(() => {
        console.error("not give data");
      });
  }, []);

  return (
    <div>
      <ul className="movie-container">
        {movieState?.results.map((item) => (
          <li key={item.id}>
            <MovieItem
              title={item.title}
              release_date={item.release_date}
              genres={item.genre_ids}
              description={shortenDescription(item.overview)}
              poster_path={item.poster_path}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
