import { useEffect, useState } from 'react';
import { serverBaseURL } from '../../config';
import { IMovie } from './types';

export default function useMovies(cityID: string): [IMovie[], boolean] {
  const [movies, setMovies] = useState([] as IMovie[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMovies(cityID).then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, [cityID]);

  return [movies, isLoading];
}

async function fetchMovies(cityID: string): Promise<IMovie[]> {
  const res = await fetch(`${serverBaseURL}/movies/${cityID}`);
  const body = await res.json();
  return body;
}
