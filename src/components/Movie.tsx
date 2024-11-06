import { Rate } from "antd";
import { useState, useEffect, useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { MovieProps, Genre } from "../types";
import "react-circular-progressbar/dist/styles.css";
import { UserContext } from "./MyContext";

const MovieItem = ({
  title,
  release_date,
  genres,
  description,
  poster_path,
  rateMovie,
  movieId,
  sessionToken,
  rating,
  vote_average,
}: MovieProps) => {
  const [movieRating, setRating] = useState(rating === undefined ? 0 : rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [starColor, setStarColor] = useState("#E9D100");

  const movieGenresContext = useContext(UserContext);

  const getGenreNames = (genreIds: number[]) =>
    genreIds
      .map((id) => {
        const genre = movieGenresContext?.genres.find(
          (g: Genre) => g.id === id
        );
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .join(", ");

  const getStarColor = (ratingStars: number) => {
    if (ratingStars <= 3) return "#E90000";
    if (ratingStars <= 5) return "#E97E00";
    if (ratingStars <= 7) return "#E9D100";
    return "#66E900";
  };

  useEffect(() => {
    const effectiveRating = hoverRating || movieRating;
    setStarColor(getStarColor(effectiveRating));
  }, [movieRating, hoverRating]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (sessionToken) {
      rateMovie(movieId, sessionToken, newRating);
    } else {
      console.error("Session is not available");
    }
  };

  const handleHoverChange = (hoverValue: number) => {
    setHoverRating(hoverValue);
  };

  useEffect(() => {
    if (rating !== undefined) {
      setRating(rating);
    }
  }, [rating]);

  const formatTitle = (movieTitle: string, wordsPerLine: number) => {
    const words = movieTitle.split(" ");
    return words.reduce((formattedTitle, word, index) => {
      const shouldAddLineBreak =
        (index + 1) % wordsPerLine === 0 && index !== words.length - 1;
      return formattedTitle + word + (shouldAddLineBreak ? " <br /> " : " ");
    }, "");
  };

  return (
    <div className="movie-item">
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" />
      <div className="movie-item__description">
        <div className="movie-item__rating" style={{ width: 70, height: 70 }}>
          <CircularProgressbar
            value={vote_average * 10}
            text={vote_average.toFixed(1)}
            styles={buildStyles({
              textColor: "#000",
              pathColor: getStarColor(vote_average),
              trailColor: "#ddd",
            })}
          />
        </div>
        <h1
          className="movie-item__title"
          dangerouslySetInnerHTML={{
            __html: formatTitle(title, 5),
          }}
        ></h1>
        <p>{release_date}</p>
        <p>{getGenreNames(genres)}</p>
        <p>{description}</p>
        <Rate
          count={10}
          value={movieRating}
          onChange={handleRatingChange}
          onHoverChange={handleHoverChange}
          style={{ color: starColor }}
        />
      </div>
    </div>
  );
};

export default MovieItem;
