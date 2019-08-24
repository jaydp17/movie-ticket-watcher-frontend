import { useEffect, useState } from 'react';
import { serverBaseURL } from '../../config';
import { IMovie, IMovieGroup } from './types';

export default function useMovies(cityID: string): [IMovieGroup[], IMovie[], boolean] {
  const [movies, setMovies] = useState([] as IMovie[]);
  const [movieGroups, setMovieGroups] = useState([] as IMovieGroup[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMovies(cityID).then(data => {
      setMovies(data.movies);
      setMovieGroups(data.movieGroups);
      setLoading(false);
    });
  }, [cityID]);

  return [movieGroups, movies, isLoading];
}

async function fetchMovies(
  cityID: string,
): Promise<{ movieGroups: IMovieGroup[]; movies: IMovie[] }> {
  const res = await fetch(`${serverBaseURL}/movies/${cityID}`);
  const movies: IMovie[] = await res.json();

  const { movieGroups } = movies.reduce(toMovieGroups, {
    movieGroups: [] as IMovieGroup[],
    addedGroupIDs: new Set<string>(),
  });

  return { movieGroups, movies };
}

function toMovieGroups(
  accumulator: { movieGroups: IMovieGroup[]; addedGroupIDs: Set<string> },
  movie: IMovie,
) {
  const { movieGroups, addedGroupIDs } = accumulator;
  if (addedGroupIDs.has(movie.groupID)) return accumulator;

  movieGroups.push({
    id: movie.groupID,
    title: movie.title,
    imageURL: movie.imageURL,
  });
  addedGroupIDs.add(movie.groupID);
  return accumulator;
}
