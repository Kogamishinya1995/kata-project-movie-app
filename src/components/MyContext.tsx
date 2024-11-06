import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Genre, GenresResponse } from "../types";

export interface MyProviderProps {
  children: ReactNode;
}

const UserContext = createContext<GenresResponse | undefined>(undefined);

const Provider: React.FC<MyProviderProps> = ({ children }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWVjMzVlY2RmZTk2YTgwOWJkODkwMmZiMTNkOWIwOCIsIm5iZiI6MTczMDgxMzUyMS4zNjkyNzEzLCJzdWIiOiI2NzFlMDAwMWE0YWM4YTQzMmM1Yzk1MDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fFD5Um6f-NUy2WTHQjWXDwIXxU4WgozX_pNX85pw97w",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data: GenresResponse) => {
        setGenres(data.genres);
        console.log(data.genres);
      })
      .catch(() => {
        console.error("genres didn't get!");
      });
  }, []);

  return (
    <UserContext.Provider value={{ genres }}>{children}</UserContext.Provider>
  );
};

export default Provider;
export { UserContext, useContext };
