import React, { useState, useEffect } from 'react';
import { serverBaseURL } from '../../config';
import { ICity } from './types';

export default function useCities(): [ICity[], boolean] {
  const [cities, setCities] = useState([] as ICity[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities().then(data => {
      setCities(data);
      setLoading(false);
    });
  }, []);

  return [cities, isLoading];
}

async function fetchCities(): Promise<ICity[]> {
  const res = await fetch(`${serverBaseURL}/cities`);
  const body = await res.json();
  return body;
}
