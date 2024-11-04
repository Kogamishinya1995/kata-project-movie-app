import { MovieProps } from "../types";

const MovieItem = ({
  title,
  release_date,
  genres,
  description,
  poster_path,
  rateMovie,
  movieId,
  sessionToken,
}: MovieProps) => (
  <div className="movie-item">
    <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" />
    <div className="movie-item__description">
      <h1 className="movie-item__title">{title}</h1>
      <p>{release_date}</p>
      <p>{genres}</p>
      <p>{description}</p>
      <button
        onClick={() => {
          rateMovie(movieId, sessionToken);
        }}
      >
        rate
      </button>
    </div>
  </div>
);

export default MovieItem;
