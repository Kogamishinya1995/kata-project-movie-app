// import { createContext, useContext, useState, ReactNode } from "react";

// interface MyContextType {
//   value: string;
//   setValue: (newValue: string) => void;
// }

// const MyContext = createContext<MyContextType | undefined>([]);

// interface MyProviderProps {
//   children: ReactNode;
// }

export default function genresGet() {
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
    .then((json) => {
      console.log('ЖАНРЫ', json);
    })
    .catch(() => {
      console.error("genres didn't get");
    });
}

genresGet();
