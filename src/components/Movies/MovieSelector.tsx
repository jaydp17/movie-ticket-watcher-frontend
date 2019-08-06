import React, { useState } from 'react';
import useMovies from './useMovies';

interface Props {
  cityID: string;
  selectMovie: (movieID: string) => void;
}
function MovieSelector({ cityID, selectMovie }: Props) {
  const [movies, isLoading] = useMovies(cityID);
  const [movieID, setMovieID] = useState();

  const onMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = e.target.value;
    if (!selectedID) return;
    setMovieID(selectedID);
    selectMovie(selectedID);
  };
  return (
    <fieldset>
      <legend>Movies</legend>
      {isLoading && <p>loading...</p>}
      {!isLoading && (
        <select name="movieID" value={movieID} onChange={onMovieChange}>
          {movies.map(m => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      )}
    </fieldset>
  );
}
export default MovieSelector;
