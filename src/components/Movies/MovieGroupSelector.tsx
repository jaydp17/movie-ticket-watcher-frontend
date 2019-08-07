import React, { useState } from 'react';
import useMovies from './useMovies';
import MovieScreenFormat from './MovieScreenFormat';
import { IMovie } from './types';

interface Props {
  cityID: string;
  selectMovie: (movieID: string) => void;
}
function MovieGroupSelector({ cityID, selectMovie }: Props) {
  const [movieGroups, movies, isLoading] = useMovies(cityID);
  const [movieGroupID, setMovieGroupID] = useState('');

  const onMovieGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = e.target.value;
    if (!selectedID) return;
    setMovieGroupID(selectedID);
  };
  const selectedGroupMovies: IMovie[] = movieGroupID
    ? movies.filter(m => m.groupID === movieGroupID)
    : [];

  return (
    <>
      <fieldset>
        <legend>Movies</legend>
        {isLoading && <p>loading...</p>}
        {!isLoading && (
          <select name="movieGroupID" value={movieGroupID} onChange={onMovieGroupChange}>
            <option hidden>Select a movie</option>
            {movieGroups.map(m => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        )}
      </fieldset>
      <MovieScreenFormat selectedGroupMovies={selectedGroupMovies} selectMovie={selectMovie} />
    </>
  );
}
export default MovieGroupSelector;
