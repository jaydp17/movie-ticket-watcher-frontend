import React, { useState } from 'react';
import SearchableDropdown from '../SearchableDropdown';
import MovieScreenFormat from './MovieScreenFormat';
import { IMovie } from './types';
import useMovies from './useMovies';

interface Props {
  cityID: string;
  selectMovie: (movieID: string) => void;
}
function MovieGroupSelector({ cityID, selectMovie }: Props) {
  const [movieGroups, movies, isLoading] = useMovies(cityID);
  const [movieGroupID, setMovieGroupID] = useState('');

  const onMovieGroupChange = (selectedID: string | null) => {
    if (!selectedID) return;
    setMovieGroupID(selectedID);
  };
  const selectedGroupMovies: IMovie[] = movieGroupID
    ? movies.filter(m => m.groupID === movieGroupID)
    : [];

  return (
    <>
      <SearchableDropdown
        label="Movie"
        items={movieGroups}
        itemToString={movieGroup => (movieGroup ? movieGroup.title : '')}
        onChange={onMovieGroupChange}
        getFilterFn={inputValue => {
          const lowerInputValue = (inputValue || '').toLowerCase();
          return movie => !lowerInputValue || movie.title.toLowerCase().includes(lowerInputValue);
        }}
      />
      <MovieScreenFormat selectedGroupMovies={selectedGroupMovies} selectMovie={selectMovie} />
    </>
  );
}

export default MovieGroupSelector;
