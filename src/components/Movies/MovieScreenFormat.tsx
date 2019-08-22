import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IMovie } from './types';

const RadioGroupWithSpace = styled(RadioGroup)`
  justify-content: space-between;
`;

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
  const onMovieIDChange = (e: React.ChangeEvent<unknown>) => {
    const selectedID = (e.target as HTMLInputElement).value;
    if (!selectedID) return;
    setMovieID(selectedID);
    selectMovie(selectedID);
  };
  return (
    <FormControl component="div" fullWidth>
      <FormHelperText component="legend">Screen Format</FormHelperText>
      <RadioGroupWithSpace
        aria-label="Screen Format"
        name="screenFormat"
        value={movieID}
        onChange={onMovieIDChange}
        row
      >
        {selectedGroupMovies.map(m => (
          <FormControlLabel
            key={m.id}
            value={m.id}
            control={<Radio />}
            label={`${m.screenFormat.toUpperCase()} - ${m.language}`}
          />
        ))}
      </RadioGroupWithSpace>
    </FormControl>
  );
}

export default MovieScreenFormat;
