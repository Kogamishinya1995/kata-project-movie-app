import { Alert, Spin } from "antd";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import MovieItem from "@Components/Movie.tsx";
import formateDate from "@Utils/formateDate.ts";
import shortenDescription from "@Utils/shortenDescription.ts";
import { MovieApi } from "./types.ts";

const App = () => {
  const [movieState, setMovieState] = useState<MovieApi>();
  const [errorState, setErrorState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState(" ");

  const url = `https://api.themoviedb.org/3/search/movie?query=${inputState}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        // eslint-disable-next-line @cspell/spellchecker
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVjMzVlY2RmZTk2YTgwOWJkODkwMmZiMTNkOWIwOCIsIm5iZiI6MTczMDQ4MDk3Mi42NjU3ODU4LCJzdWIiOiI2NzFlMDAwMWE0YWM4YTQzMmM1Yzk1MDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GuwoEE_PIEy9QyueO1fk_Butq1nM2qTvo-EY6NjTbrE",
    },
  };

  console.log(movieState);

  const fetchMovies = debounce(() => {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((json: MovieApi) => {
        setMovieState(json);
        setErrorState(false);
      })
      .catch(() => {
        console.error("Failed to fetch data");
        setErrorState(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 500);

  useEffect(() => {
    if (inputState.trim()) {
      fetchMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  return errorState ? (
    <Alert
      message="Error!"
      description="An error occurred while accessing the server"
      type="error"
      showIcon
    />
  ) : (
    <div>
      <input type="text" value={inputState} onChange={inputChange} />
      {loading ? (
        <div>
          <Spin className="spin" size="large" />
        </div>
      ) : (
        <ul className="movie-container">
          {movieState?.results.map((item) => (
            <li key={item.id}>
              <MovieItem
                title={item.title}
                release_date={formateDate(item.release_date)}
                genres={item.genre_ids}
                description={shortenDescription(item.overview)}
                poster_path={item.poster_path}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
