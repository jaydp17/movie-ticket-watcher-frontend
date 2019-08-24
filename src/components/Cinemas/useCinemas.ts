import { useEffect, useState } from 'react';
import { serverBaseURL } from '../../config';
import { ICinema } from './types';

export default function useCinemas(cityID: string): [ICinema[], boolean] {
  const [cinemas, setCinemas] = useState([] as ICinema[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCinemas(cityID).then(data => {
      setCinemas(data);
      setLoading(false);
    });
  }, [cityID]);

  return [cinemas, isLoading];
}

async function fetchCinemas(cityID: string): Promise<ICinema[]> {
  const res = await fetch(`${serverBaseURL}/cinemas/${cityID}`);
  const body = await res.json();
  return body;
}
