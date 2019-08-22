import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DownshiftComponent, { DownshiftInterface } from 'downshift';
import React, { useState } from 'react';
import ScrollablePaper from '../shared/ScrollablePaper';
import MovieScreenFormat from './MovieScreenFormat';
import { IMovie, IMovieGroup } from './types';
import useMovies from './useMovies';

function getDownShift<T>() {
  return DownshiftComponent as DownshiftInterface<T>;
}

const Downshift = getDownShift<IMovieGroup>();

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
      <Downshift
        onChange={selection => onMovieGroupChange(selection && selection.id)}
        itemToString={item => (item == null ? '' : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          openMenu,
          selectedItem,
        }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({ onFocus: openMenu });
          return (
            <div>
              <div>
                {renderInput({
                  fullWidth: true,
                  label: 'Movie',
                  InputLabelProps: getLabelProps(),
                  InputProps: { onBlur, onChange, onFocus },
                  inputProps,
                })}
              </div>
              <ScrollablePaper {...getMenuProps()}>
                {isOpen
                  ? movieGroups
                      .filter(
                        movieGroup =>
                          !inputValue ||
                          movieGroup.title.toLowerCase().includes(inputValue.toLowerCase()),
                      )
                      .map((movieGroup, index) =>
                        renderMovieGroupItem({
                          movieGroup,
                          highlightedIndex,
                          index,
                          selectedItem,
                          itemProps: getItemProps({ item: movieGroup }),
                        }),
                      )
                  : null}
              </ScrollablePaper>
            </div>
          );
        }}
      </Downshift>
      <MovieScreenFormat selectedGroupMovies={selectedGroupMovies} selectMovie={selectMovie} />
    </>
  );
}

interface MovieGroupItemProps {
  highlightedIndex: null | number;
  index: number;
  itemProps: object;
  selectedItem: IMovieGroup | null;
  movieGroup: IMovieGroup;
}
function renderMovieGroupItem(movieGroupItemProps: MovieGroupItemProps) {
  const { movieGroup, index, itemProps, highlightedIndex, selectedItem } = movieGroupItemProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem && selectedItem.id === movieGroup.id;

  return (
    <MenuItem
      {...itemProps}
      key={movieGroup.id}
      selected={isHighlighted}
      component="div"
      style={{ fontWeight: isSelected ? 500 : 400 }}
    >
      {movieGroup.title}
    </MenuItem>
  );
}

function renderInput(inputProps: any) {
  const { InputProps, classes, ref, InputLabelProps, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps,
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      {...other}
    />
  );
}

export default MovieGroupSelector;
