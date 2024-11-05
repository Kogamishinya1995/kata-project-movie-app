import { Spin } from "antd";
import debounce from "lodash/debounce";
import { useEffect, useState, useCallback } from "react";
import { Offline, Online } from "react-detect-offline";
import ResponsivePagination from "react-responsive-pagination";
import AlertComponent from "@Components/Alert.tsx";
import MovieItem from "@Components/Movie.tsx";
import formateDate from "@Utils/formateDate.ts";
import shortenDescription from "@Utils/shortenDescription.ts";
import { MovieApi, GuestSession, RatedMovies } from "./types.ts";
import "react-responsive-pagination/themes/classic.css";

const App = () => {
  const [movieState, setMovieState] = useState<MovieApi>();
  const [errorState, setErrorState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState(" ");
  const [pageState, setPageState] = useState(1);
  const [sessionState, setSessionState] = useState<GuestSession>();
  const [ratedMovieState, setRatedMovieState] = useState<RatedMovies>();

  const url = `https://api.themoviedb.org/3/search/movie?query=${inputState}&page=${pageState.toString()}`;
  const urlGuestSession =
    "https://api.themoviedb.org/3/authentication/guest_session/new";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVjMzVlY2RmZTk2YTgwOWJkODkwMmZiMTNkOWIwOCIsIm5iZiI6MTczMDQ4MDk3Mi42NjU3ODU4LCJzdWIiOiI2NzFlMDAwMWE0YWM4YTQzMmM1Yzk1MDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GuwoEE_PIEy9QyueO1fk_Butq1nM2qTvo-EY6NjTbrE",
    },
  };

  const fetchMovies = debounce(() => {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((json: MovieApi) => {
        setMovieState(json);
        setErrorState(false);
        setPageState(json.page);
      })
      .catch(() => {
        console.error("Failed to fetch data");
        setErrorState(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 700);

  const guestSession = useCallback(() => {
    fetch(urlGuestSession, options)
      .then((res) => res.json())
      .then((json: GuestSession) => {
        setSessionState(json);
      })
      .catch(() => {
        console.error("Failed to get guest session key");
      });
  }, []);

  useEffect(() => {
    if (inputState.trim()) {
      fetchMovies();
    }
  }, [inputState, pageState]);

  useEffect(() => {
    guestSession();
  }, [guestSession]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const rateMovie = (id: number, session: string, starsCount: number) => {
    const ratedUrl = `https://api.themoviedb.org/3/movie/${id.toString()}/rating?guest_session_id=${session}`;
    const ratedOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVjMzVlY2RmZTk2YTgwOWJkODkwMmZiMTNkOWIwOCIsIm5iZiI6MTczMDYxNDk1OS40MjAzNjU2LCJzdWIiOiI2NzFlMDAwMWE0YWM4YTQzMmM1Yzk1MDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nXoG4orvpoi17YEEdJyu1UYDgc8ZiAywvJDrj-ZX40U",
      },
      body: JSON.stringify({ value: starsCount }),
    };

    fetch(ratedUrl, ratedOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log("Rated one movie:", json);
        getRatedFilms();
      })
      .catch(() => {
        console.error("Failed to rate movie");
      });
  };

  const getRatedFilms = () => {
    if (!sessionState || !sessionState.guest_session_id) {
      console.error("Session is not available or session ID is missing");
      return;
    }

    const urlRated = `https://api.themoviedb.org/3/guest_session/${sessionState.guest_session_id}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`;
    const optionsRated = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVjMzVlY2RmZTk2YTgwOWJkODkwMmZiMTNkOWIwOCIsIm5iZiI6MTczMDYxNDk1OS40MjAzNjU2LCJzdWIiOiI2NzFlMDAwMWE0YWM4YTQzMmM1Yzk1MDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nXoG4orvpoi17YEEdJyu1UYDgc8ZiAywvJDrj-ZX40U",
      },
    };

    fetch(urlRated, optionsRated)
      .then((res) => res.json())
      .then((json: RatedMovies) => {
        console.log("Rated movies:", json);
        setRatedMovieState(json);
      })
      .catch(() => {
        console.error("Failed to get rated movies");
      });
  };

  useEffect(() => {
    if (sessionState && sessionState.guest_session_id) {
      getRatedFilms();
    }
  }, [sessionState]);

  return (
    <div>
      <Online>
        {errorState ? (
          <AlertComponent />
        ) : (
          <div>
            <input type="text" value={inputState} onChange={inputChange} />
            {loading ? (
              <Spin className="spin" size="large" />
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
                      movieId={item.id}
                      sessionToken={sessionState?.guest_session_id || ""}
                      rateMovie={rateMovie}
                      vote_average={item.vote_average}
                    />
                  </li>
                ))}
              </ul>
            )}
            <ResponsivePagination
              current={pageState}
              total={movieState?.total_pages ?? 0}
              onPageChange={setPageState}
            />
            <div>
              <ul>
                {ratedMovieState?.results ? (
                  ratedMovieState.results.map((item) => (
                    <li key={item.id}>
                      <MovieItem
                        title={item.title}
                        release_date={formateDate(item.release_date)}
                        genres={item.genre_ids}
                        description={shortenDescription(item.overview)}
                        poster_path={item.poster_path}
                        movieId={item.id}
                        sessionToken={sessionState?.guest_session_id || ""}
                        rateMovie={rateMovie}
                        rating={item.rating}
                        vote_average={item.vote_average}
                      />
                    </li>
                  ))
                ) : (
                  <p>No rated movies available</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </Online>
      <Offline>
        <AlertComponent />
      </Offline>
    </div>
  );
};

export default App;
