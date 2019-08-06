import React, { useState } from 'react';
import { IMovie } from './types';

interface Props {
  selectedGroupMovies: IMovie[];
  selectMovie: (movieID: string) => void;
}
function MovieScreenFormat({ selectedGroupMovies, selectMovie }: Props) {
  const [movieID, setMovieID] = useState();

  if (selectedGroupMovies.length === 0) return null;
  if (selectedGroupMovies.length === 1) {
    selectMovie(selectedGroupMovies[0].id);
    return null;
  }
  const onMovieIDChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = e.target.value;
    if (!selectedID) return;
    setMovieID(selectedID);
    selectMovie(selectedID);
  };
  return (
    <fieldset>
      <legend>Screen Format</legend>
      <select name="movieID" value={movieID} onChange={onMovieIDChange}>
        {selectedGroupMovies.map(m => (
          <option key={m.id} value={m.id}>
            {m.screenFormat}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default MovieScreenFormat;
